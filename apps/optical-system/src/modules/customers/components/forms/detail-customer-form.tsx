import { FC } from 'react';
import Input from 'libs/ui/src/components/forms/input';
import Textarea from 'libs/ui/src/components/forms/textarea';
import Listbox from 'libs/ui/src/components/list-box';
import { Customer } from '@product-line/dexie';

interface DetailCustomerFormProps {
  customer: Customer;
}

export const DetailCustomerForm: FC<DetailCustomerFormProps> = ({
  customer,
}) => {
  return (
    <form noValidate className="flex flex-wrap w-full">
      <div className="w-full sm:w-1/2 px-2">
        <Input
          className="w-full mb-4"
          label="Nombre"
          id="name"
          value={customer.name}
          disabled
        />
        <Input
          className="w-full mb-4"
          label="Apellido"
          id="lastName"
          value={customer.lastName}
          disabled
        />
        <Input
          className="w-full mb-4"
          label="Fecha de nacimiento"
          id="birthDate"
          type="date"
          value={customer.birthDate}
          disabled
        />
        <Input
          className="w-full mb-4"
          label="Dirección"
          id="address"
          value={customer.address}
          disabled
        />
        <Input
          className="w-full mb-4"
          label="Código Postal"
          id="postalCode"
          value={customer.postalCode}
          disabled
        />
      </div>
      <div className="w-full sm:w-1/2 px-2">
        <Listbox
          className="w-full mb-4"
          label="Provincia"
          options={[]}
          selectedOption={{
            name: customer.province || '',
            value: customer.province || '',
          }}
          disabled
        />
        <Listbox
          className="w-full mb-4"
          label="Localidad"
          options={[]}
          selectedOption={{
            name: customer.locality || '',
            value: customer.locality || '',
          }}
          disabled
        />
        <Input
          className="w-full mb-4"
          label="Teléfono"
          id="phone"
          type="tel"
          value={customer.phone}
          disabled
        />
        <Input
          className="w-full mb-4"
          label="Celular"
          id="mobile"
          type="tel"
          value={customer.mobile}
          disabled
        />
        <Input
          className="w-full mb-4"
          label="Email"
          id="email"
          type="email"
          value={customer.email}
          disabled
        />
      </div>
      <div className="w-full px-2">
        <Textarea
          className="w-full mb-4"
          label="Comentarios"
          id="comments"
          value={customer.comments}
          disabled
        />
      </div>
    </form>
  );
};

export default DetailCustomerForm;
