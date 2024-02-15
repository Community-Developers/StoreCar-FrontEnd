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
    portas: number;
    potenciaMotor: number;
    imagensVeiculos: ImagemVeiculo[];
    opcionais: {
        abs: boolean;
        airbags: boolean;
        controleEstabilidade: boolean;
        controleTracao: boolean;
        assistenciaFreioEmergencia: boolean;
        sistemaAvisoColisao: boolean;
        arCondicionado: boolean;
        vidrosEletricos: boolean;
        direcaoEletrica: boolean;
        bancosCouro: boolean;
        ajusteAlturaBancoMotorista: boolean;
        sistemaSom: boolean;
        cameraRe: boolean;
        sistemaNavegacao: boolean;
        bluetooth: boolean;
        volanteMultifuncional: boolean;
    };
}

export interface ImagemVeiculo {
    id: number;
    veiculoId: number;
    imageUrl: string;
    marcaRef: string;
    nameRef: string;
}
