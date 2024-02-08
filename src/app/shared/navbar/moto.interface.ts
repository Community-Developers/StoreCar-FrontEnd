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
    imagensMotocicleta: ImagemMotocicleta[];
}

export interface ImagemMotocicleta {
    id: number;
    imageUrl: string;
    marcaRef: string;
    nameRef: string;
}
