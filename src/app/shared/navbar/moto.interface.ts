export interface Moto {
    id: number;
    renavam: string;
    placa: string;
    marca: string;
    modelo: string;
    cor: string;
    cambio: string;
    tipoMoto: string;
    condicao: string;
    combustivel: string;
    valor: number;
    destaque: boolean;
    km: number;
    anoFabricacao: number;
    anoModelo: number;
    titulo: string;
    descricao: string;
    cilindrada: number;
    potencia: number;
    imagensMotocicleta: ImagemMotocicleta[];
}

export interface ImagemMotocicleta {
    id: number | undefined;
    imageUrl: string;
    marcaRef: string | undefined;
    nameRef: string | undefined;
}
