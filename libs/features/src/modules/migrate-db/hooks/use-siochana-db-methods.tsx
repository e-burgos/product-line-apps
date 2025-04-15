import { ICustomer, IPrescription, IServicePrescription } from '../types';
import { customers } from '../data/customers';
import { provinces } from '../data/provinces';
import { localities } from '../data/localities';
import { prescriptions } from '../data/prescriptions';
import { servicesPrescription } from '../data/services-by-prescription';
import {
  Customer,
  Prescription,
  PrescriptionCrystalSpecs,
  PrescriptionDetail,
} from 'libs/dexie/src/optical-cloud-db/types/db-types';
import { useCallback, useMemo } from 'react';
import { creditCards } from '../data/credit-cards';
import { v4 as uuidv4 } from 'uuid';

export const useSiochanaDbMethods = () => {
  // Customer Methods
  const getProvince = useCallback((idProvince: number) => {
    return (
      provinces?.find((province) => province.id === idProvince)?.name || '-'
    );
  }, []);

  const getLocality = useCallback((idLocality: number) => {
    return (
      localities?.find((locality) => locality.id === idLocality)?.name || '-'
    );
  }, []);

  const customerMapper = useCallback(
    (customer: ICustomer[]): Customer[] => {
      return customer
        .sort((a, b) => a.idCliente - b.idCliente)
        .map((customer) => {
          return {
            id: customer.idCliente.toString(),
            name: customer?.Nombre?.trim() || '-',
            lastName: customer?.Apellido?.trim() || '-',
            birthDate: '-',
            address: customer?.Direccion?.trim() || '-',
            postalCode: customer?.codPostal?.toString() || '-',
            province: getProvince(customer?.idProvincia) || '-',
            locality: getLocality(customer?.idLocalidad) || '-',
            phone: customer?.Telefono?.toString() || '-',
            mobile: customer?.Celular?.toString() || '-',
            email: customer?.Email?.trim() || '-',
            comments: '-',
            prescriptions: [],
          };
        });
    },
    [getLocality, getProvince]
  );

  // Customer Data
  const customersData = useMemo(() => {
    return customerMapper(customers);
  }, [customerMapper]);

  // Customer Map
  const customersMap = useMemo(() => {
    const map = new Map<string, Customer>();
    customersData.forEach((customer) => {
      if (customer.id) {
        map.set(customer.id, customer);
      }
    });
    return map;
  }, [customersData]);

  const getCustomerById = useCallback(
    (id: string) => {
      return customersMap.get(id);
    },
    [customersMap]
  );

  // Crystal Specs Methods
  const crystalSpecsMapper = useCallback(
    (
      servicesPrescription: IServicePrescription[]
    ): PrescriptionCrystalSpecs[] => {
      return servicesPrescription.map((servicesPrescription) => {
        return {
          prescriptionId: servicesPrescription?.id?.toString(),
          nearRightSphere: servicesPrescription?.COD?.toString() || '-',
          nearRightCylinder: servicesPrescription?.CODCIL?.toString() || '-',
          nearRightAxis: servicesPrescription?.CODEN?.toString() || '-',
          nearLeftSphere: servicesPrescription?.COI?.toString() || '-',
          nearLeftCylinder: servicesPrescription?.COICIL?.toString() || '-',
          nearLeftAxis: servicesPrescription?.COIEN?.toString() || '-',
          farRightSphere: servicesPrescription?.LOD?.toString() || '-',
          farRightCylinder: servicesPrescription?.LODCIL?.toString() || '-',
          farRightAxis: servicesPrescription?.LODEN?.toString() || '-',
          farLeftSphere: servicesPrescription?.LOI?.toString() || '-',
          farLeftCylinder: servicesPrescription?.LOICIL?.toString() || '-',
          farLeftAxis: servicesPrescription?.LOIEN?.toString() || '-',
        };
      });
    },
    []
  );

  // Crystal Specs Data
  const crystalSpecsData = useMemo(() => {
    return crystalSpecsMapper(servicesPrescription);
  }, [crystalSpecsMapper]);

  // Crystal Specs Map
  const crystalSpecsMap = useMemo(() => {
    const map = new Map<string, PrescriptionCrystalSpecs>();
    crystalSpecsData.forEach((specs) => {
      if (specs.prescriptionId) {
        map.set(specs.prescriptionId, specs);
      }
    });
    return map;
  }, [crystalSpecsData]);

  const getCrystalSpecsById = useCallback(
    (id: string) => {
      return crystalSpecsMap.get(id);
    },
    [crystalSpecsMap]
  );

  //Prescription Payment Methods
  const prescriptionDetailMapper = useCallback(
    (servicesPrescription: IServicePrescription[]): PrescriptionDetail[] => {
      return servicesPrescription.map((servicesPrescription) => {
        return {
          prescriptionId: servicesPrescription?.idFicha.toString(),
          doctorName: servicesPrescription?.Doctor || '-',
          frameDesc: servicesPrescription?.Armazon || '-',
          framePrice: servicesPrescription?.TotArmazon || 0,
          crystalDesc: servicesPrescription?.Cristales || '-',
          crystalPrice: servicesPrescription?.TotCristales || 0,
          contactLensDesc: servicesPrescription?.LContacto || '-',
          contactLensPrice: servicesPrescription?.TotLContacto || 0,
          arrangementDesc: servicesPrescription?.Arreglos || '-',
          arrangementPrice: servicesPrescription?.TotArreglos || 0,
          products: [],
          subtotalAmount:
            Number(servicesPrescription?.TotArmazon) +
              Number(servicesPrescription?.TotCristales) +
              Number(servicesPrescription?.TotLContacto) +
              Number(servicesPrescription?.TotArreglos) || 0,
        };
      });
    },
    []
  );

  const prescriptionDetailData = useMemo(() => {
    return prescriptionDetailMapper(servicesPrescription);
  }, [prescriptionDetailMapper]);

  const prescriptionDetailMap = useMemo(() => {
    const map = new Map<string, PrescriptionDetail>();
    prescriptionDetailData.forEach((detail) => {
      if (detail.prescriptionId) {
        map.set(detail.prescriptionId, detail);
      }
    });
    return map;
  }, [prescriptionDetailData]);

  const getPrescriptionDetailById = useCallback(
    (id: string) => {
      return prescriptionDetailMap.get(id);
    },
    [prescriptionDetailMap]
  );
  // Prescription Methods
  const getCreditCardById = useCallback((id: number) => {
    return creditCards.find((creditCard) => creditCard.idTarjeta === id);
  }, []);

  const prescriptionMapper = useCallback(
    (prescription: IPrescription[]): Prescription[] => {
      return prescription
        .sort((a, b) => a.idFicha - b.idFicha)
        .map((prescription) => {
          return {
            id: uuidv4(),
            receiptNumber: prescription?.NroFicha || 0,
            date: prescription?.FechaAlta?.toString() || '-',
            description: prescription?.FechaModifica?.toString() || '-',
            balanceAmount: prescription?.Saldo || 0,
            totalAmount: prescription?.Total || 0,
            customer: getCustomerById(prescription?.idCliente.toString()),
            crystalSpecs: getCrystalSpecsById(prescription?.idFicha.toString()),
            prescriptionDetail: getPrescriptionDetailById(
              prescription?.idFicha.toString()
            ),
            prescriptionPayment: {
              prescriptionId: prescription?.idFicha.toString(),
              paymentMethod:
                Number(prescription?.Pago) > 0 ? 'Efectivo' : 'Tarjeta',
              cashDeposit: Number(prescription?.Pago) || 0,
              creditCardDeposit: Number(prescription?.PagoTarjeta) || 0,
              creditCardType:
                getCreditCardById(prescription?.idTarjeta)?.Descripcion || '-',
              creditCardNumber: Number(prescription?.NumeroTarjeta) || 0,
              creditCardInstallments: Number(prescription?.CantCuotas) || 0,
            },
          };
        });
    },
    [
      getCustomerById,
      getCrystalSpecsById,
      getCreditCardById,
      getPrescriptionDetailById,
    ]
  );

  const prescriptionsData = useMemo(() => {
    return prescriptionMapper(prescriptions);
  }, [prescriptionMapper]);

  return { customersData, prescriptionsData };
};

export default useSiochanaDbMethods;
