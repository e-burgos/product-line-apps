import { Fragment, useEffect, useState } from 'react';
import { resolveText, DXCInputField } from 'dexie-cloud-addon';
import { Input, Spinner, useToastStore } from '@product-line/ui';
import Modal from 'libs/ui/src/components/modal';
import { useAuthStore } from '../hooks/use-auth-store';
import PinCode from 'libs/ui/src/components/forms/pin-code';
import InputLabel from 'libs/ui/src/components/input-label';
import { useNavigate } from 'react-router-dom';
import Button from 'libs/ui/src/components/button';
import { SendIcon } from 'lucide-react';
import useInitCloudDB from '../hooks/use-init-cloud-db';

export function LoginModal() {
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const { ui, isUserAuthorized, getUserLogged } = useInitCloudDB();
  const { openLoginModal, setOpenLoginModal } = useAuthStore();
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [inputType, setInputType] = useState<'email' | 'otp'>('email');
  const [params, setParams] = useState<{ [param: string]: string }>({});

  const validateEmail = () => {
    const re = /\S+@\S+\.\S+/;
    if (email === '') {
      return 'El email es requerido';
    }
    if (!re.test(email)) {
      return 'El email es inválido';
    }
    return '';
  };

  const validateOtp = () => {
    if (otp?.length < 8) {
      return 'El código debe tener 8 dígitos';
    }
    return '';
  };

  useEffect(() => {
    if (ui?.alerts.length) {
      ui.alerts.forEach((alert) => {
        addToast({
          id: alert.type,
          title: alert.type,
          message: resolveText(alert),
          variant: alert.type === 'error' ? 'destructive' : 'success',
        });
      });
    }
  }, [addToast, ui?.alerts]);

  useEffect(() => {
    if (isUserAuthorized) {
      setOpenLoginModal(false);
      navigate('/customers');
    }
  }, [getUserLogged, isUserAuthorized, navigate, setOpenLoginModal]);

  return (
    <Modal
      text={{ title: 'Iniciar sesión' }}
      className="w-[90%] lg:w-[680px] xl:w-[fit-content] xl:min-w-[680px] dark:bg-gray-900"
      hideButtons={true}
      closeable
      isOpen={openLoginModal}
      setIsOpen={setOpenLoginModal}
    >
      {ui ? (
        <form
          noValidate
          className="flex flex-wrap w-full"
          onSubmit={(ev) => {
            ev.preventDefault();
            ui.onSubmit(params);
          }}
        >
          {(Object.entries(ui.fields) as [string, DXCInputField][]).map(
            ([fieldName, { type }], idx) => (
              <Fragment key={idx}>
                {type === 'email' && (
                  <Input
                    label="Ingrese el correo electrónico de administración"
                    placeholder="Ingrese un correo electrónico válido"
                    icon={<SendIcon className="h-4 w-4 mt-1" />}
                    className="w-full mb-4"
                    type={type}
                    name={fieldName}
                    autoFocus
                    error={validateEmail()}
                    value={params[fieldName] || ''}
                    onChange={(ev) => {
                      const value = ev.target.value;
                      const updatedParams = {
                        ...params,
                        [fieldName]: value,
                      };
                      setEmail(value);
                      setInputType('email');
                      setOtp('');
                      setParams(updatedParams);
                    }}
                  />
                )}
                {type === 'otp' && (
                  <div className="flex flex-col w-full text-center">
                    <InputLabel
                      title={`Ingrese el código que recibió en su email ${email}`}
                    />
                    <PinCode
                      variant="outline"
                      length={8}
                      type="text"
                      placeholder="-"
                      inputClassName="reset-password-pin-code border-[#E3E8ED] focus:border-[#111827] focus:ring-gray-900 dark:focus:ring-gray-200 dark:focus:ring-1 !text-lg lg:!text-2xl 2xl:!text-[32px] w-8 h-8 lg:w-14 lg:h-16 2xl:w-14 2xl:h-[72px] !mr-0 focus:!ring-opacity-0 dark:focus:!ring-opacity-100"
                      className="mb-4 mt-4 gap-0 sm:gap-4 2xl:mb-6 2xl:gap-6"
                      error={validateOtp()}
                      setValue={(value) => {
                        const updatedParams = {
                          ...params,
                          [fieldName]: value as string,
                        };
                        setOtp(value as string);
                        setInputType('otp');
                        setParams(updatedParams);
                      }}
                    />
                  </div>
                )}
              </Fragment>
            )
          )}
          <div className="w-full flex justify-center gap-2 mt-8 px-2">
            <Button
              size="medium"
              shape="rounded"
              variant="ghost"
              onClick={() => {
                ui?.onCancel();
                setOpenLoginModal(false);
              }}
            >
              {'Volver'}
            </Button>
            {inputType === 'email' && (
              <Button
                size="medium"
                shape="rounded"
                type="submit"
                onClick={() => {
                  ui?.onSubmit(params);
                }}
                disabled={!!validateEmail()}
              >
                {'Enviar Código'}
              </Button>
            )}
            {inputType === 'otp' && (
              <Button
                size="medium"
                shape="rounded"
                type="submit"
                onClick={() => {
                  ui?.onSubmit(params);
                }}
                disabled={!!validateOtp()}
              >
                {'Confirmar'}
              </Button>
            )}
          </div>
        </form>
      ) : (
        <div className="flex justify-center items-center w-full h-28">
          {!isUserAuthorized && <Spinner />}
          {isUserAuthorized && (
            <Button
              variant="solid"
              size="medium"
              onClick={() => {
                setOpenLoginModal(false);
                navigate('/customers');
              }}
            >
              Usuario autorizado, haga clic para ingresar
            </Button>
          )}
        </div>
      )}
    </Modal>
  );
}
