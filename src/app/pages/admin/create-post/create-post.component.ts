import { AdminService } from './../../../services/admin.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { ImagemMotocicleta } from 'src/app/shared/navbar/moto.interface';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';


interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
  disabled?: boolean;
}


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  isLoading = false;
  texto: any;
  isEdit: boolean = false;

  public cadastroFormVeiculo: FormGroup = this.fb.group({
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    carroceria: ['', Validators.required],
    cambio: ['', Validators.required],
    combustivel: ['', Validators.required],
    cor: ['', Validators.required],
    anoFabricacao: ['', Validators.required],
    anoModelo: ['', Validators.required],
    titulo: [''],
    descricao: [''],
    renavam: [{ value: '', disabled: true }],
    placa: [{ value: '', disabled: true }],
    valor: ['', Validators.required],
    condicao: ['', Validators.required],
    potenciaMotor: ['', Validators.required],
    portas: ['', Validators.required],
    km: ['', Validators.required],
    opcionais: this.fb.group({
      abs: [false],
      airbags: [false],
      controleEstabilidade: [false],
      controleTracao: [false],
      assistenciaFreioEmergencia: [false],
      sistemaAvisoColisao: [false],
      arCondicionado: [false],
      vidrosEletricos: [false],
      direcaoEletrica: [false],
      bancosCouro: [false],
      ajusteAlturaBancoMotorista: [false],
      sistemaSom: [false],
      cameraRe: [false],
      sistemaNavegacao: [false],
      bluetooth: [false],
      volanteMultifuncional: [false],
    })
  });

  public cadastroFormMoto: FormGroup = this.fb.group({
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    cambio: ['', Validators.required],
    combustivel: ['', Validators.required],
    cor: ['', Validators.required],
    anoFabricacao: ['', Validators.required],
    anoModelo: ['', Validators.required],
    titulo: [''],
    descricao: [''],
    renavam: [{ value: '', disabled: true }],
    placa: [{ value: '', disabled: true }],
    valor: ['', Validators.required],
    condicao: ['', Validators.required],
    tipoMoto: ['', Validators.required],
    potencia: [''],
    cilindrada: [''],
    km: [''],
  });
  id: any;

  sendNewImages(type: string, id: string) {

    if (this.selectedFiles.length > 0) {
      const formData = new FormData();

      this.selectedFiles.forEach((file) => {
        formData.append('files', file, file.name);
      });

      this.adminService.saveNewImages(formData, type, id).subscribe(res => {
        console.log(res)
      });
    }

  }
  submitForm() {

    if (this.isEdit && this.cadastroFormVeiculo.valid) {
      const value = this.formatarFormPostCarro();
      this.isLoading = true;
      this.adminService.updateCarro(this.id, value).subscribe({
        next: (res) => {
          console.log(res)
          this.isLoading = false; // Desativa o indicador de carregamento após a conclusão da requisição.
          this.location.back();
        },
        error: (error) => {
          console.log(error)
          this.isLoading = false;
          this.loginService.handleError(error);
        }
      })

      this.sendNewImages('veiculo', this.id);

    } else if (!this.isEdit && this.cadastroFormVeiculo.valid) {

      const value = this.formatarFormPostCarro();
      const formData = new FormData();
      const valueFormated = JSON.stringify(value);


      formData.append('veiculoData', valueFormated);


      this.selectedFiles.forEach((file) => {
        formData.append('file', file, file.name);
      });


      this.texto = "Publicando...";
      this.isLoading = true;
      this.adminService.post(formData).subscribe({
        next: (res) => {
          console.log(res)
          this.isLoading = false; // Desativa o indicador de carregamento após a conclusão da requisição.
          this.cadastroFormVeiculo.reset();
          this.images = [];
          this.selectedFiles = [];
          this.location.back();

        },
        error: (error) => {
          console.log(error)
          this.isLoading = false;
          this.loginService.handleError(error);
        }
      })
    }
  }

  submitFormMoto() {

    if (this.isEdit && this.cadastroFormMoto.valid) {
      const value = this.formatarFormPostMoto();
      console.log(value)
      this.isLoading = true;
      this.adminService.updateMobi(this.id, value).subscribe({
        next: (res) => {
          console.log(res)
          this.isLoading = false; // Desativa o indicador de carregamento após a conclusão da requisição.
          this.location.back();

        },
        error: (error) => {
          console.log(error)
          this.isLoading = false;
          this.loginService.handleError(error);
        }
      })

      this.sendNewImages('motocicleta', this.id);

    } else {

      const value = this.formatarFormPostMoto();
      const formData = new FormData();
      const valueFormated = JSON.stringify(value);

      formData.append('motocicletaData', valueFormated);

      this.selectedFiles.forEach((file) => {
        formData.append('file', file, file.name);
      });

      this.texto = "Publicando...";
      this.isLoading = true;

      this.adminService.postMoto(formData).subscribe({
        next: (res) => {
          console.log(res)
          this.isLoading = false; // Desativa o indicador de carregamento após a conclusão da requisição.
          this.cadastroFormMoto.reset();
          this.images = [];
          this.selectedFiles = [];
          this.location.back();
        },
        error: (error) => {
          console.log(error)
          this.isLoading = false;
          this.loginService.handleError(error);

        }
      })

    }

  }


  routerActive: string = "activelink";
  checked = true;

  years = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024].reverse();
  cores: string[] = [
    "preto",
    "branco",
    "prata",
    "cinza",
    "vermelho",
    "azul",
    "verde",
    "bege",
    "amarelo",
    "marrom",
    "dourado",
    "laranja",
    "rosa",
    "vinho",
    "roxo"
  ];

  carrocerias: string[] = [
    "hatch",
    "sedan",
    "suv",
    "wagon",
    "utilitario"
  ];

  carForm!: FormGroup;
  veiculo: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router,
    private activatedRoute: ActivatedRoute, private fb: FormBuilder, private adminService: AdminService, private loginService: LoginService,
    private location: Location) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.veiculo = false;
      const type = params['type'];
      const id = params['id'];
      if (type && id) {
        if (type == 'veiculo') {
          this.veiculo = true;
          this.editarItem(type, id);
        }
        else {
          this.editarItem(type, id);
        }
      } else if (type === 'motocicleta') {
        console.log("CRIAR MOTOCICLETA");
      }
      else {
        this.veiculo = true;
        console.log("CRIAR AUTOMOVEL");
      }
    });
  }

  editarItem(type: string, id: number) {
    this.adminService.getItem(type, id).subscribe(item => {
      console.log(item)
      this.id = id;
      this.isEdit = true;
      this.preencherFormularioComDados(type, item);
      // this.location.back();
    })

    console.log(this.selectedFiles);
  }

  formatarFormPostCarro() {
    const valueOf = this.cadastroFormVeiculo.getRawValue();

    valueOf.carroceria = valueOf.carroceria.toUpperCase();
    valueOf.combustivel = valueOf.combustivel.toUpperCase();
    valueOf.condicao = valueOf.condicao.toUpperCase();

    // return JSON.stringify(valueOf);
    return valueOf;
  }
  formatarFormPostMoto() {
    const valueOf = this.cadastroFormMoto.getRawValue();

    valueOf.tipoMoto = valueOf.tipoMoto.toUpperCase();
    valueOf.combustivel = valueOf.combustivel.toUpperCase();
    valueOf.condicao = valueOf.condicao.toUpperCase();

    // return JSON.stringify(valueOf);
    return valueOf;
  }

  preencherFormularioComDados(type: string, dados: any): void {

    if (type === 'veiculo' && dados) {

      // Preenchendo os dados básicos do veículo
      this.cadastroFormVeiculo.patchValue({
        marca: dados.marca,
        modelo: dados.modelo,
        carroceria: dados.carroceria.toLowerCase(),
        cambio: dados.cambio.toLowerCase(),
        combustivel: dados.combustivel.toLowerCase(),
        cor: dados.cor.toLowerCase(),
        anoFabricacao: dados.anoFabricacao.toString(),
        anoModelo: dados.anoModelo.toString(),
        titulo: dados.titulo,
        descricao: dados.descricao,
        potenciaMotor: dados.potenciaMotor,
        portas: dados.portas.toString(),
        //renavam: dados.renavam,
        //placa: dados.placa,
        valor: dados.valor, // Note a mudança de 'valor' para 'preco'
        condicao: dados.condicao.toLowerCase(),
        km: dados.km.toString(),
      });

      // Preenchendo os recursos opcionais
      this.cadastroFormVeiculo.get('opcionais')?.patchValue({
        abs: dados.opcionais.abs,
        airbags: dados.opcionais.airbags,
        controleEstabilidade: dados.opcionais.controleEstabilidade,
        controleTracao: dados.opcionais.controleTracao,
        assistenciaFreioEmergencia: dados.opcionais.assistenciaFreioEmergencia,
        sistemaAvisoColisao: dados.opcionais.sistemaAvisoColisao,
        arCondicionado: dados.opcionais.arCondicionado,
        vidrosEletricos: dados.opcionais.vidrosEletricos,
        direcaoEletrica: dados.opcionais.direcaoEletrica,
        bancosCouro: dados.opcionais.bancosCouro,
        ajusteAlturaBancoMotorista: dados.opcionais.ajusteAlturaBancoMotorista,
        sistemaSom: dados.opcionais.sistemaSom,
        cameraRe: dados.opcionais.cameraRe,
        sistemaNavegacao: dados.opcionais.sistemaNavegacao,
        bluetooth: dados.opcionais.bluetooth,
        volanteMultifuncional: dados.opcionais.volanteMultifuncional,
      });

      for (let img of dados.imagensVeiculos) {
        this.images.push(img);
      }
      console.log(this.images[0]);

    }
    if (type === 'motocicleta' && dados) {
      this.cadastroFormMoto.patchValue({
        marca: dados.marca,
        modelo: dados.modelo,
        cor: dados.cor.toLowerCase(),
        anoFabricacao: dados.anoFabricacao.toString(),
        anoModelo: dados.anoModelo.toString(),
        titulo: dados.titulo,
        descricao: dados.descricao,
        //renavam: dados.renavam,
        //placa: dados.placa,
        valor: dados.valor, // Note a mudança de 'valor' para 'preco'
        condicao: dados.condicao.toLowerCase(),
        combustivel: dados.combustivel.toLowerCase(),
        tipoMoto: dados.tipoMoto.toLowerCase(),
        cambio: dados.cambio,
        km: dados.km,
        potencia: dados.potencia?.toString(),
        cilindrada: dados.cilindrada?.toString(),
      });

      for (let img of dados.imagensMotocicleta) {
        this.images.push(img);
      }
    }

  }




  selectedFiles: File[] = []; // Armazenar os arquivos selecionados
  images: any[] = []; // Armazenar as URLs de dados para visualização

  processFile(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    //this.images = []; // Limpar a lista de imagens anterior

    this.selectedFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {


          const imagemMotocicleta: ImagemMotocicleta = {
            id: undefined,
            imageUrl: e.target.result, // URL da imagem codificada em base64
            marcaRef: undefined,
            nameRef: undefined,
          };

          this.images.push(imagemMotocicleta); // Adicionar a URL de dados da imagem ao array para visualização
        };
        reader.readAsDataURL(file);
      }
    });
  }





  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  sidebarMenu: sidebarMenu[] = [
    {
      link: "/admin",
      icon: "home",
      menu: "Dashboard",
    },
    {
      link: "/admin/table/automovel",
      icon: "truck",
      menu: "Lista Automóveis",
    },
    {
      link: "/admin/post/automovel",
      icon: "plus",
      menu: "Anúnciar Automóvel",
    },
    {
      link: "/admin/table/motocicleta",
      icon: "disc",
      menu: "Lista Motocicletas",
    },
    {
      link: "/admin/post/motocicleta",
      icon: "plus",
      menu: "Anúnciar Motocicleta",
    },
    {
      link: "/",
      icon: "eye",
      menu: "Visão do visitante (em breve)",
      disabled: true
    },
    {
      link: "/",
      icon: "pie-chart",
      menu: "Análises (em breve)",
      disabled: true
    },
  ]
  onBack(): void {
    this.location.back();
  }

  formattedValue = '';

  removeCurrencySign() {
    this.formattedValue = this.formattedValue.replace('R$', '').trim();
  }

  addCurrencySign() {
    if (this.formattedValue && !this.formattedValue.startsWith('R$')) {
      this.formattedValue = 'R$ ' + this.formattedValue;
    }
  }

  removeImage(index: number, id: string, object: string): void {
    this.images.splice(index, 1);
    if (this.isEdit && this.veiculo && id) {
      console.log(id + "=================" + object + "REMOVE IMAGE =================")
      this.adminService.deleteImageCarro(id, object).subscribe({
        next: (res) => {
          console.log(res);
        }
      });

    } else if (this.isEdit && !this.veiculo && id) {
      console.log(id + "=================" + object + "REMOVE IMAGE =================")
      this.adminService.deleteImageMoto(id, object).subscribe({
        next: (res) => {
          //this.images.splice(index, 1);
          console.log(res);
        }
      });

    } else if (this.isEdit && !id) {
      console.log("É PARA SER ID UNDEFINED")
      //this.images.splice(index, 1); // Remove a imagem da visualização
      this.selectedFiles.splice(index, 1); // Remove o arquivo da lista a ser enviada
    } else {
      //this.images.splice(index, 1); // Remove a imagem da visualização
      this.selectedFiles.splice(index, 1); // Remove o arquivo da lista a ser enviada
    }
  }
}
