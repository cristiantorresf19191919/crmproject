/* import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first, switchMap, map, subscribeOn } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';

import { MessageService } from 'primeng/api';




import { ValidacionesPersonalizadas } from 'src/app/_validadores/ValidacionesPersonalizadas';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [MessageService]
})
export class RegisterComponent implements OnInit {
    formreg: FormGroup;

    
    loading = false;
    submitted = false;
    returnUrl: string;
    es: any;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
 
        private messageService: MessageService) {
        this.es = {
            firstDayOfWeek: 1,
            dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
            today: 'Hoy',
            clear: 'Borrar'
        }

    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.registreseService.listarTiposIdentificacion().subscribe(tiposIdentificacion => this.tiposIdentificacion = tiposIdentificacion);
        this.registreseService.listarSexos().subscribe(sexos => this.sexos = sexos);


        this.formreg = this.formBuilder.group({
            nombres: ['', Validators.required],
            apellidos: ['', Validators.required],
            identificacion: ['', [Validators.required], this.exiteNumeroDocumento.bind(this)],
            tipoIdentificacionId: [null, Validators.required],
            fechaNacimiento: ['', Validators.required],
            sexoId: [null, Validators.required],
            telefono: '',
            celular: ['', Validators.required],
            direccion: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]],
            nombreUsuario: ['', Validators.required],
            contrasenia: ['', Validators.required],
            confirmeContrasenia: ['', Validators.required]
        }, { validator: ValidacionesPersonalizadas.passwordMatcher })
    }

    exiteNumeroDocumento(control: AbstractControl) {
      
        return timer(500).pipe(switchMap(()=>{
            return this.registreseService.existeNumeroIdentificacion(Number(control.value)).pipe(map(data => {
                return data ? { 'existeNumeroDocumento': true } : null;
            }));
        }));
    }


    onSubmit() {
        this.submitted = true;
        if (this.formReg.invalid) {
            return;
        }
        this.loading = true;
        this.registreseService.registro(this.formReg.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.messageService.clear();
                    this.messageService.add({ key: 'msgGuardado', sticky: true, severity: data.tipo, summary: data.resumen, detail: data.contenido, closable: false });
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    aceptarRegistro() {
        this.router.navigate([this.returnUrl + '/login']);
    }
} */