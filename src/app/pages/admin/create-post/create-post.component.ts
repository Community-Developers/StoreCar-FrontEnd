import { AdminService } from './../../../services/admin.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  public cadastroFormVeiculo: FormGroup = this.fb.group({
    marca: [''],
    modelo: [''],
    carroceria: [''],
    cambio: [''],
    combustivel: [''],
    cor: [''],
    anoFabricacao: [''],
    anoModelo: [''],
    titulo: [''],
    descricao: [''],
    renavam: [''],
    placa: [''],
    preco: [''],
    condicao: [''],
    optionalFeatures: this.fb.group({
      abs: [false],
      airbags: [false],
      stabilityControl: [false],
      tractionControl: [false],
      emergencyBrakeAssist: [false],
      collisionWarningSystem: [false],
      airConditioning: [false],
      powerWindows: [false],
      electricPowerSteering: [false],
      leatherSeats: [false],
      driverSeatHeightAdjustment: [false],
      soundSystem: [false],
      rearViewCamera: [false],
      navigationSystem: [false],
      bluetooth: [false],
      multifunctionalSteeringWheel: [false],
    })
  });

  public cadastroFormMoto: FormGroup = this.fb.group({
    marca: [''],
    modelo: [''],
    cambio: [''],
    combustivel: [''],
    cor: [''],
    anoFabricacao: [''],
    anoModelo: [''],
    titulo: [''],
    descricao: [''],
    renavam: [''],
    placa: [''],
    preco: [''],
    condicao: ['']
  });

  submitForm() {
    const veiculoData = JSON.stringify(this.cadastroFormVeiculo.value);
    console.log(veiculoData)
    const formData = new FormData();
    formData.append('veiculoData', veiculoData);

    this.selectedFiles.forEach((file) => {
      formData.append('file', file, file.name);
    });

    this.adminService.post(formData).subscribe((res) => {
      console.log(res)
    })
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
    "cupê",
    "conversível",
    "perua",
    "minivan",
    "picape",
    "van",
    "crossover",
    "esportivo"
  ];

  carForm!: FormGroup;
  veiculo: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private adminService: AdminService) { }
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
      this.preencherFormularioComDados(type, item);
    })
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
        renavam: dados.renavam,
        placa: dados.placa,
        preco: dados.valor, // Note a mudança de 'valor' para 'preco'
        condicao: dados.condicao.toLowerCase(),
      });

      // Preenchendo os recursos opcionais
      this.cadastroFormVeiculo.get('optionalFeatures')?.patchValue({
        abs: dados.opcionais.abs,
        airbags: dados.opcionais.airbags,
        stabilityControl: dados.opcionais.controleEstabilidade,
        tractionControl: dados.opcionais.controleTracao,
        emergencyBrakeAssist: dados.opcionais.assistenciaFreioEmergencia,
        collisionWarningSystem: dados.opcionais.sistemaAvisoColisao,
        airConditioning: dados.opcionais.arCondicionado,
        powerWindows: dados.opcionais.vidrosEletricos,
        electricPowerSteering: dados.opcionais.direcaoEletrica,
        leatherSeats: dados.opcionais.bancosCouro,
        driverSeatHeightAdjustment: dados.opcionais.ajusteAlturaBancoMotorista,
        soundSystem: dados.opcionais.sistemaSom,
        rearViewCamera: dados.opcionais.cameraRe,
        navigationSystem: dados.opcionais.sistemaNavegacao,
        bluetooth: dados.opcionais.bluetooth,
        multifunctionalSteeringWheel: dados.opcionais.volanteMultifuncional,
      });

      for (let img of dados.imagensVeiculos) {
        this.images.push(img.imageUrl);
      }
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
        renavam: dados.renavam,
        placa: dados.placa,
        preco: dados.valor, // Note a mudança de 'valor' para 'preco'
        condicao: dados.condicao.toLowerCase(),
        combustivel: dados.combustivel.toLowerCase(),

      });

      for (let img of dados.imagensMotocicleta) {
        this.images.push(img.imageUrl);
      }
    }

  }




  selectedFiles: File[] = []; // Armazenar os arquivos selecionados
  images: string[] = []; // Armazenar as URLs de dados para visualização

  processFile(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    //this.images = []; // Limpar a lista de imagens anterior

    this.selectedFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result); // Adicionar a URL de dados da imagem ao array para visualização
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
      menu: "Visão do visitante",
    },
    {
      link: "/",
      icon: "pie-chart",
      menu: "Análises",
    },
  ]
  onBack(): void {
    this.router.navigate(['/flexy/home']);
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

  removeImage(index: number): void {
    this.images.splice(index, 1); // Remove a imagem da visualização
    this.selectedFiles.splice(index, 1); // Remove o arquivo da lista a ser enviada
  }




}
