import Input from 'libs/ui/src/components/forms/input';
import React from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PrescriptionFormData } from './validations';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import InputLabel from 'libs/ui/src/components/input-label';

interface EyeSpecsFieldsProps {
  register: UseFormRegister<PrescriptionFormData>;
  setValue?: UseFormSetValue<PrescriptionFormData>;
  errors?: FieldErrors<PrescriptionFormData>;
}

const EyeSpecsFields: React.FC<EyeSpecsFieldsProps> = ({
  register,
  errors,
}) => {
  return (
    <>
      <CardTitle title="Lejos">
        <div>
          <InputLabel title="Ojo Derecho" className="mb-0" />
          <div className="flex flex-row flex-wrap justify-between gap-2">
            <Input
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="farRightSphere"
              type="decimal"
              pattern="^[-+]?[0-9]*\.?[0-9]+$"
              error={errors?.farRightSphere?.message}
              icon={
                <span className="text-[10px] font-bold border h-5 rounded mt-0.5 px-0.5">
                  SPH
                </span>
              }
              {...register('farRightSphere', {
                pattern: {
                  value: /^[-+]?[0-9]*\.?[0-9]+$/,
                  message: 'La esfera debe iniciar con un simbolo "-" o "+".',
                },
                validate: (value) => {
                  if (
                    value.length > 0 &&
                    !value.startsWith('-') &&
                    !value.startsWith('+')
                  ) {
                    return 'La esfera debe iniciar con un símbolo "-" o "+".';
                  }
                  if (Number(value) < -30 || Number(value) > 30) {
                    return 'La esfera debe ser un número entre -30 y 30';
                  }
                  return true;
                },
              })}
            />
            <Input
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="farRightCylinder"
              type="decimal"
              error={errors?.farRightCylinder?.message}
              icon={
                <span className="text-[10px] font-bold border h-5 rounded mt-0.5 px-0.5">
                  CIL
                </span>
              }
              {...register('farRightCylinder', {
                pattern: {
                  value: /^[-+]?[0-9]*\.?[0-9]+$/,
                  message: 'El cilindro debe iniciar con un simbolo "-" o "+".',
                },
                validate: (value) => {
                  if (
                    value.length > 0 &&
                    !value.startsWith('-') &&
                    !value.startsWith('+')
                  ) {
                    return 'El cilindro debe iniciar con un símbolo "-" o "+".';
                  }
                  if (Number(value) < -10 || Number(value) > 10) {
                    return 'El cilindro debe ser un número entre -10 y 10';
                  }
                  return true;
                },
              })}
            />
            <Input
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="farRightAxis"
              type="number"
              error={errors?.farRightAxis?.message}
              icon={
                <span className="text-[10px] font-bold border h-5 rounded mt-0.5 px-0.5">
                  EJE
                </span>
              }
              {...register('farRightAxis', {
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'El eje debe ser un número entre 0 y 180',
                },
                validate: (value) => {
                  if (Number(value) < 0 || Number(value) > 180) {
                    return 'El eje debe ser un número entero entre 0 y 180';
                  }
                  return true;
                },
              })}
            />
          </div>
        </div>
        <div>
          <InputLabel title="Ojo Izquierdo" className="mb-0 mt-4" />
          <div className="flex flex-row flex-wrap justify-between gap-2">
            <Input
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="farLeftSphere"
              type="decimal"
              pattern="^[-+]?[0-9]*\.?[0-9]+$"
              error={errors?.farLeftSphere?.message}
              icon={
                <span className="text-[10px] font-bold border h-5 rounded mt-0.5 px-0.5">
                  SPH
                </span>
              }
              {...register('farLeftSphere', {
                pattern: {
                  value: /^[-+]?[0-9]*\.?[0-9]+$/,
                  message: 'La esfera debe iniciar con un simbolo "-" o "+".',
                },
                validate: (value) => {
                  if (
                    value.length > 0 &&
                    !value.startsWith('-') &&
                    !value.startsWith('+')
                  ) {
                    return 'La esfera debe iniciar con un símbolo "-" o "+".';
                  }
                  if (Number(value) < -30 || Number(value) > 30) {
                    return 'La esfera debe ser un número entre -30 y 30';
                  }
                  return true;
                },
              })}
            />
            <Input
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="farLeftCylinder"
              type="decimal"
              error={errors?.farLeftCylinder?.message}
              icon={
                <span className="text-[10px] font-bold border h-5 rounded mt-0.5 px-0.5">
                  CIL
                </span>
              }
              {...register('farLeftCylinder', {
                pattern: {
                  value: /^[-+]?[0-9]*\.?[0-9]+$/,
                  message: 'El cilindro debe iniciar con un simbolo "-" o "+".',
                },
                validate: (value) => {
                  if (
                    value.length > 0 &&
                    !value.startsWith('-') &&
                    !value.startsWith('+')
                  ) {
                    return 'El cilindro debe iniciar con un símbolo "-" o "+".';
                  }
                  if (Number(value) < -10 || Number(value) > 10) {
                    return 'El cilindro debe ser un número entre -10 y 10';
                  }
                  return true;
                },
              })}
            />
            <Input
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="farLeftAxis"
              type="number"
              error={errors?.farLeftAxis?.message}
              icon={
                <span className="text-[10px] font-bold border h-5 rounded mt-0.5 px-0.5">
                  EJE
                </span>
              }
              {...register('farLeftAxis', {
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'El eje debe ser un número entre 0 y 180',
                },
                validate: (value) => {
                  if (Number(value) < 0 || Number(value) > 180) {
                    return 'El eje debe ser un número entero entre 0 y 180';
                  }
                  return true;
                },
              })}
            />
          </div>
        </div>
      </CardTitle>
      <CardTitle title="Cerca" className="mt-8">
        <div>
          <InputLabel title="Ojo Derecho" className="mb-0" />
          <div className="flex flex-row flex-wrap justify-between gap-2">
            <Input
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="nearRightSphere"
              type="decimal"
              pattern="^[-+]?[0-9]*\.?[0-9]+$"
              error={errors?.nearRightSphere?.message}
              icon={
                <span className="text-[10px] font-bold border h-5 rounded mt-0.5 px-0.5">
                  SPH
                </span>
              }
              {...register('nearRightSphere', {
                pattern: {
                  value: /^[-+]?[0-9]*\.?[0-9]+$/,
                  message: 'La esfera debe iniciar con un simbolo "-" o "+".',
                },
                validate: (value) => {
                  if (
                    value.length > 0 &&
                    !value.startsWith('-') &&
                    !value.startsWith('+')
                  ) {
                    return 'La esfera debe iniciar con un símbolo "-" o "+".';
                  }
                  if (Number(value) < -30 || Number(value) > 30) {
                    return 'La esfera debe ser un número entre -30 y 30';
                  }
                  return true;
                },
              })}
            />
            <Input
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="nearRightCylinder"
              type="decimal"
              error={errors?.nearRightCylinder?.message}
              icon={
                <span className="text-[10px] font-bold border h-5 rounded mt-0.5 px-0.5">
                  CIL
                </span>
              }
              {...register('nearRightCylinder', {
                pattern: {
                  value: /^[-+]?[0-9]*\.?[0-9]+$/,
                  message: 'El cilindro debe iniciar con un simbolo "-" o "+".',
                },
                validate: (value) => {
                  if (
                    value.length > 0 &&
                    !value.startsWith('-') &&
                    !value.startsWith('+')
                  ) {
                    return 'El cilindro debe iniciar con un símbolo "-" o "+".';
                  }
                  if (Number(value) < -10 || Number(value) > 10) {
                    return 'El cilindro debe ser un número entre -10 y 10';
                  }
                  return true;
                },
              })}
            />
            <Input
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="nearRightAxis"
              type="number"
              error={errors?.nearRightAxis?.message}
              icon={
                <span className="text-[10px] font-bold border h-5 rounded mt-0.5 px-0.5">
                  EJE
                </span>
              }
              {...register('nearRightAxis', {
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'El eje debe ser un número entre 0 y 180',
                },
                validate: (value) => {
                  if (Number(value) < 0 || Number(value) > 180) {
                    return 'El eje debe ser un número entero entre 0 y 180';
                  }
                  return true;
                },
              })}
            />
          </div>
        </div>
        <div>
          <InputLabel title="Ojo Izquierdo" className="mb-0 mt-4" />
          <div className="flex flex-row flex-wrap justify-between gap-2">
            <Input
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="nearLeftSphere"
              type="decimal"
              pattern="^[-+]?[0-9]*\.?[0-9]+$"
              error={errors?.nearLeftSphere?.message}
              icon={
                <span className="text-[10px] font-bold border h-5 rounded mt-0.5 px-0.5">
                  SPH
                </span>
              }
              {...register('nearLeftSphere', {
                pattern: {
                  value: /^[-+]?[0-9]*\.?[0-9]+$/,
                  message: 'La esfera debe iniciar con un simbolo "-" o "+".',
                },
                validate: (value) => {
                  if (
                    value.length > 0 &&
                    !value.startsWith('-') &&
                    !value.startsWith('+')
                  ) {
                    return 'La esfera debe iniciar con un símbolo "-" o "+".';
                  }
                  if (Number(value) < -30 || Number(value) > 30) {
                    return 'La esfera debe ser un número entre -30 y 30';
                  }
                  return true;
                },
              })}
            />
            <Input
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="nearLeftCylinder"
              type="decimal"
              error={errors?.nearLeftCylinder?.message}
              icon={
                <span className="text-[10px] font-bold border h-5 rounded mt-0.5 px-0.5">
                  CIL
                </span>
              }
              {...register('nearLeftCylinder', {
                pattern: {
                  value: /^[-+]?[0-9]*\.?[0-9]+$/,
                  message: 'El cilindro debe iniciar con un simbolo "-" o "+".',
                },
                validate: (value) => {
                  if (
                    value.length > 0 &&
                    !value.startsWith('-') &&
                    !value.startsWith('+')
                  ) {
                    return 'El cilindro debe iniciar con un símbolo "-" o "+".';
                  }
                  if (Number(value) < -10 || Number(value) > 10) {
                    return 'El cilindro debe ser un número entre -10 y 10';
                  }
                  return true;
                },
              })}
            />
            <Input
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="nearLeftAxis"
              type="number"
              error={errors?.nearLeftAxis?.message}
              icon={
                <span className="text-[10px] font-bold border h-5 rounded mt-0.5 px-0.5">
                  EJE
                </span>
              }
              {...register('nearLeftAxis', {
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'El eje debe ser un número entre 0 y 180',
                },
                validate: (value) => {
                  if (Number(value) < 0 || Number(value) > 180) {
                    return 'El eje debe ser un número entero entre 0 y 180';
                  }
                  return true;
                },
              })}
            />
          </div>
        </div>
      </CardTitle>
    </>
  );
};

export default EyeSpecsFields;
