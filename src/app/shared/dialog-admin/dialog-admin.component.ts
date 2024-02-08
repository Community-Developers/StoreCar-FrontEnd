import { AdminService } from './../../services/admin.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface CarInfo {
  title: string;
  price: number;
  brand: string;
  model: string;
  mileage: number;
  manufacturingYear: number | string;
  modelYear: number | string;
  bodyStyle: string;
  description: string;
  options: {
    abs: boolean;
    airbags: boolean;
    stabilityControl: boolean;
    tractionControl: boolean;
    emergencyBrakeAssist: boolean;
    collisionWarningSystem: boolean;
    airConditioning: boolean;
    powerWindows: boolean;
    electricPowerSteering: boolean;
    leatherSeats: boolean;
    driverSeatHeightAdjustment: boolean;
    soundSystem: boolean;
    rearViewCamera: boolean;
    navigationSystem: boolean;
    bluetooth: boolean;
    multifunctionalSteeringWheel: boolean;
  };
}

const carInfo: CarInfo = {
  title: "Car Title",
  price: 20000,
  brand: "Honda",
  model: "Civic",
  mileage: 50000,
  manufacturingYear: 2020,
  modelYear: 2021,
  bodyStyle: "Sedan",
  description: "This is a great car!",
  options: {
    abs: true,
    airbags: true,
    stabilityControl: true,
    tractionControl: true,
    emergencyBrakeAssist: true,
    collisionWarningSystem: true,
    airConditioning: true,
    powerWindows: true,
    electricPowerSteering: true,
    leatherSeats: true,
    driverSeatHeightAdjustment: true,
    soundSystem: true,
    rearViewCamera: true,
    navigationSystem: true,
    bluetooth: true,
    multifunctionalSteeringWheel: true,
  },
};


@Component({
  selector: 'app-dialog-admin',
  templateUrl: './dialog-admin.component.html',
  styleUrls: ['./dialog-admin.component.scss']
})
export class DialogAdminComponent implements OnInit {

  carForm!: FormGroup;
  inputData: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<DialogAdminComponent>, private builder: FormBuilder,
    private adminService: AdminService) {
    this.inputData = data;
  }

  ngOnInit(): void {
    console.log(this.inputData)


    this.carForm = this.builder.group({
      title: [''],
      price: [''],
      brand: [''],
      model: [''],
      mileage: [''],
      manufacturingYear: [null],
      modelYear: [null],
      bodyStyle: [''],
      description: [''],
      optionalFeatures: this.builder.group({
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

    if (this.inputData.car !== null && !this.inputData.del && this.inputData.edit) {
      this.carForm.patchValue(this.inputData.car);
      this.carForm.get('optionalFeatures')?.patchValue(this.inputData.car.options);
    }
  }

  deleteItem() {
    console.log('entrou no delete dialog');
    console.log(this.inputData);

    // A verificação específica de tipo não é mais necessária se a lógica é a mesma para ambos os casos.
    // A condição para verificar se o tipo é 'veiculo' ou 'motocicleta' pode ser removida se a ação subsequente for idêntica.
    // Se necessário, assegure-se de que `this.inputData.type` sempre terá um valor válido ('veiculo' ou 'motocicleta') antes de chamar este método.

    //this.isLoading = true; // Inicia o indicador de carregamento antes da requisição.

    //this.adminService.deleteItem(this.inputData.id, this.inputData.type).subscribe({
    //next: (res) => {
    //console.log(res); // Log da resposta
    //this.isLoading = false; // Desativa o indicador de carregamento após a conclusão da requisição.
    //this.ref.close(); // Fecha o diálogo ou componente atual.
    //},
    //error: (error) => {
    //console.error('Erro ao deletar o item:', error);
    //this.isLoading = false; // Assegura que o indicador de carregamento será desativado mesmo em caso de erro.
    // Pode adicionar tratamento de erro específico aqui, se necessário.
    //}
    //});

    this.ref.close({ delete: true })
  }


  saveuser() {
    this.ref.close(this.carForm.value);
  }

}
