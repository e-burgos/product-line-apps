import React, { useState, useEffect, FC } from 'react';
import Button from 'libs/ui/src/components/button/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from 'libs/ui/src/components/forms/input';
import Textarea from 'libs/ui/src/components/forms/textarea';
import Listbox, { ListboxOption } from 'libs/ui/src/components/list-box';
import { State, City } from 'country-state-city';
import { useCustomerStore } from '../../hooks/use-customer-store';
import {
  useCustomerMethods,
  usePrescriptionMethods,
} from '@product-line/dexie';

interface CustomerFormData {
  name: string;
  lastName: string;
  birthDate?: string;
  address?: string;
  postalCode?: string;
  province?: string;
  locality?: string;
  phone?: string;
  mobile?: string;
  email: string;
  comments?: string;
}

interface EditCustomerFormProps {
  customerId: string;
}

export const EditCustomerForm: FC<EditCustomerFormProps> = ({ customerId }) => {
  const { updateCustomer, getCustomerById } = useCustomerMethods();
  const { getPrescriptionsByCustomerId } = usePrescriptionMethods();
  const { setOpenEditModal } = useCustomerStore();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<CustomerFormData>();

  const customer = getCustomerById(customerId);
  const prescriptions = getPrescriptionsByCustomerId(customerId);

  useEffect(() => {
    const subscription = watch((_value, { name, type }) => {
      if (type === 'change') {
        trigger(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  useEffect(() => {
    async function loadCustomer() {
      if (customer) {
        reset({
          name: customer.name,
          lastName: customer.lastName,
          birthDate: customer.birthDate,
          address: customer.address,
          postalCode: customer.postalCode,
          phone: customer.phone,
          mobile: customer.mobile,
          email: customer.email,
          comments: customer.comments,
        });
      }
    }
    loadCustomer();
  }, [customer, customerId, reset]);

  const [provinces, setProvinces] = useState<ListboxOption[]>([]);
  const [localities, setLocalities] = useState<ListboxOption[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<ListboxOption>();
  const [selectedLocality, setSelectedLocality] = useState<ListboxOption>();

  useEffect(() => {
    const provincesData = State.getStatesOfCountry('AR').map((state) => ({
      name: state.name,
      value: state.isoCode,
    }));
    setProvinces(provincesData);
  }, []);

  useEffect(() => {
    if (provinces.length > 0) {
      setSelectedProvince(provinces.find((p) => p.name === customer?.province));
    }
  }, [customer?.province, provinces]);

  useEffect(() => {
    if (selectedProvince) {
      const localitiesData = City.getCitiesOfState(
        'AR',
        selectedProvince.value
      ).map((city) => ({
        name: city.name,
        value: city.stateCode,
      }));
      setLocalities(localitiesData);
      setSelectedLocality({
        name: customer?.locality || '',
        value: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince]);

  const onSubmit: SubmitHandler<CustomerFormData> = async (data) => {
    const update = await updateCustomer({
      id: customer?.id,
      name: data.name,
      lastName: data.lastName,
      birthDate: data.birthDate,
      address: data.address,
      postalCode: data.postalCode,
      province: selectedProvince?.name,
      locality: selectedLocality?.name,
      phone: data.phone,
      mobile: data.mobile,
      email: data.email,
      comments: data.comments,
      prescriptions: prescriptions || [],
    });
    if (update.isSuccess) setOpenEditModal(false);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap mx-auto"
    >
      <div className="w-full sm:w-1/2 px-2">
        <Input
          className="w-full mb-4"
          required
          label="Nombre"
          id="name"
          error={errors?.name?.message}
          {...register('name', {
            required: 'El nombre es obligatorio',
            validate: (value) =>
              value.length > 2 || 'El nombre debe tener al menos 3 caracteres',
          })}
        />
        <Input
          className="w-full mb-4"
          required
          label="Apellido"
          id="lastName"
          error={errors?.lastName?.message}
          {...register('lastName', {
            required: 'El apellido es obligatorio',
            validate: (value) =>
              value.length > 2 ||
              'El apellido debe tener al menos 3 caracteres',
          })}
        />
        <Input
          className="w-full mb-4"
          label="Fecha de nacimiento"
          id="birthDate"
          type="date"
          error={errors?.birthDate?.message}
          {...register('birthDate', {
            max: {
              value: new Date().toISOString().split('T')[0],
              message: 'La fecha no puede ser mayor a la actual',
            },
            min: {
              value: '1900-01-01',
              message: 'La fecha no puede ser menor a 1900',
            },
            validate: (value) => {
              if (!value) return true;
              const date = new Date(value as string);
              const isValidDate =
                date instanceof Date && !isNaN(date.getTime());
              return isValidDate || 'La fecha no es válida';
            },
          })}
        />
        <Input
          className="w-full mb-4"
          label="Dirección"
          id="address"
          {...register('address')}
        />
        <Input
          className="w-full mb-4"
          label="Código Postal"
          id="postalCode"
          {...register('postalCode')}
        />
      </div>
      <div className="w-full sm:w-1/2 px-2">
        <Listbox
          className="w-full mb-4"
          label="Provincia"
          options={provinces}
          selectedOption={selectedProvince}
          onChange={(e) => setSelectedProvince(e as ListboxOption)}
          onSelect={(value) => setValue('province', value)}
        />
        <Listbox
          className="w-full mb-4"
          label="Localidad"
          options={localities}
          selectedOption={selectedLocality}
          onChange={(e) => setSelectedLocality(e as ListboxOption)}
          onSelect={(value) => setValue('locality', value)}
          disabled={!selectedProvince}
        />
        <Input
          className="w-full mb-4"
          label="Teléfono"
          id="phone"
          type="tel"
          error={errors?.phone?.message}
          {...register('phone', {
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'El teléfono debe contener 10 dígitos',
            },
          })}
        />
        <Input
          className="w-full mb-4"
          label="Celular"
          id="mobile"
          type="tel"
          error={errors?.mobile?.message}
          {...register('mobile', {
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'El celular debe contener 10 dígitos',
            },
          })}
        />
        <Input
          className="w-full mb-4"
          label="Email"
          id="email"
          type="email"
          error={errors?.email?.message}
          {...register('email', {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'El email no es válido',
            },
          })}
        />
      </div>
      <div className="w-full px-2">
        <Textarea
          className="w-full mb-4"
          label="Comentarios"
          id="comments"
          {...register('comments')}
        />
      </div>
      <div className="w-full flex justify-center gap-2 mt-6 px-2">
        <Button
          size="medium"
          shape="rounded"
          variant="ghost"
          onClick={() => {
            setOpenEditModal(false);
          }}
        >
          {'Cerrar'}
        </Button>
        <Button size="medium" shape="rounded" type="submit" disabled={!isValid}>
          {'Guardar Cambios'}
        </Button>
      </div>
    </form>
  );
};

export default EditCustomerForm;
