export interface ILocality {
  id: number;
  name: string;
}

export interface IProvince {
  id: number;
  name: string;
}

export interface ICustomer {
  idCliente: number;
  idProvincia: number;
  idLocalidad: number;
  Nombre: string;
  Apellido: string;
  Direccion: string;
  codPostal: number;
  Email: string;
  Telefono: string | number;
  Celular: string | number;
}

export interface IPrescription {
  idFicha: number;
  NroFicha: number;
  idCliente: number;
  Total: number;
  Pago: number;
  PagoTarjeta: number;
  idTarjeta: number;
  CantCuotas: number;
  Saldo: number;
  FechaAlta: string;
  FechaModifica?: string;
  NumeroTarjeta?: string | number;
}

export interface IServicePrescription {
  id: number;
  idFicha: number;
  LOD?: number;
  LODCIL?: number;
  LODEN?: number;
  LOI?: number;
  LOICIL?: number;
  LOIEN?: number;
  COD?: number;
  CODCIL?: number;
  CODEN?: number;
  COI?: number;
  COICIL?: number;
  COIEN?: number;
  Doctor?: string;
  Armazon?: string;
  TotArmazon?: number;
  Cristales?: string;
  TotCristales?: number;
  LContacto?: string;
  TotLContacto?: number;
  Arreglos?: string;
  TotArreglos?: number;
}

export interface ICreditCard {
  idTarjeta: number;
  Descripcion: string;
}
