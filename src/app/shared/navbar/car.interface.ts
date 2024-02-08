export interface Car {
    id: number;
    renavam: string;
    placa: string;
    marca: string;
    modelo: string;
    cor: string;
    cambio: string;
    condicao: string;
    combustivel: string;
    valor: number;
    destaque: boolean;
    km: number;
    anoFabricacao: number;
    anoModelo: number;
    titulo: string;
    descricao: string;
    carroceria: string;
    imagensVeiculos: ImagemVeiculo[];
}

export interface ImagemVeiculo {
    id: number;
    veiculoId: number;
    imageUrl: string;
    marcaRef: string;
    nameRef: string;
}
