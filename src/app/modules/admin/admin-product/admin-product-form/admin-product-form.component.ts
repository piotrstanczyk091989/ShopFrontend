import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AdminCategoryNameDto } from "../../common/dto/adminCategoryNameDto";
import { FormCategoryService } from "./form-category.service";

@Component({
    selector: 'app-admin-product-form',
    template: `
    <div [formGroup]="parentForm" fxLayout="column">
        <mat-form-field appearance="fill">
            <mat-label>Nazwa</mat-label>
            <input matInput placeholder="Podaj nazwe produktu" formControlName="name">
            <div *ngIf="name?.invalid && (name?.dirty || name?.touched)" class="erroMessages">
                <div *ngIf="name?.errors?.['required']">
                    Nazwa jest wymagana
                </div>
                <div *ngIf="name?.errors?.['minlength']">
                    Nazwa musi mieć przynajmniej 4 znaki
                </div>
            </div>
        </mat-form-field>

        <mat-form-field appearance="fill">
            <mat-label>Przyjazny url</mat-label>
            <input matInput placeholder="Podaj url" formControlName="slug">
            <div *ngIf="slug?.invalid && (slug?.dirty || slug?.touched)" class="erroMessages">
                <div *ngIf="slug?.errors?.['required']">
                    Slug jest wymagana
                </div>
                <div *ngIf="slug?.errors?.['minlength']">
                    Slug musi mieć przynajmniej 4 znaki
                </div>
            </div>
        </mat-form-field>

        <mat-form-field appearance="fill">
            <mat-label>Opis</mat-label>
            <textarea matInput rows="10" placeholder="Podaj opis produktu" formControlName="description"></textarea>
            <div *ngIf="description?.invalid && (description?.dirty || description?.touched)" class="erroMessages">
                <div *ngIf="description?.errors?.['required']">
                    Opis jest wymagany
                </div>
                <div *ngIf="description?.errors?.['minlength']">
                    Opis musi mieć przynajmniej 4 znaki
                </div>
            </div>
        </mat-form-field>

        <mat-form-field appearance="fill">
            <mat-label>Pełny opis</mat-label>
            <textarea matInput rows="40" placeholder="Podaj pełny opis produktu" 
            formControlName="fullDescription"></textarea>
        </mat-form-field>

        <mat-form-field appearance="fill">
            <mat-label>Kategoria</mat-label>
            <mat-select formControlName="categoryId">
                <mat-option *ngFor="let el of categories" [value]="el.id">
                {{el.name}}
                </mat-option>                
            </mat-select>
            <div *ngIf="categoryId?.invalid && (categoryId?.dirty || categoryId?.touched)" class="erroMessages">
                <div *ngIf="categoryId?.errors?.['required']">
                    Kategoria jest wymagana
                </div>
            </div>
        </mat-form-field>

        <mat-form-field appearance="fill">
            <mat-label>Cena</mat-label>
            <input matInput placeholder="Podaj cene produktu" formControlName="price">
            <div *ngIf="price?.invalid && (price?.dirty || price?.touched)" class="erroMessages">
                <div *ngIf="price?.errors?.['required']">
                    Cena jest wymagana
                </div>
                <div *ngIf="price?.errors?.['min']">
                    Cena musi być wieksza od zera
                </div>
            </div>
        </mat-form-field>

        <mat-form-field appearance="fill">
            <mat-label>Waluta</mat-label>
            <input matInput placeholder="Podaj walutę" formControlName="currency">
            <div *ngIf="currency?.invalid && (currency?.dirty || currency?.touched)" class="erroMessages">
                <div *ngIf="currency?.errors?.['required']">
                    Waluta jest wymagana
                </div>
            </div>
        </mat-form-field>

        <div fxLayoutAlign="end">
            <button mat-flat-button color="primary" [disabled]="!parentForm.valid">Zapisz</button>
        </div>
    </div>`,

    styles: [`
    .erroMessages{
        color:red;
    }`]

})
export class AdminProductFormComponent implements OnInit {

    @Input() parentForm!: FormGroup;
    categories: Array<AdminCategoryNameDto> = [];

    constructor(private formCategoryService: FormCategoryService){

    }

    ngOnInit(): void {
        this.getCategories();
    }

    getCategories(){
        this.formCategoryService.getCategories()
        .subscribe(categories => this.categories = categories);
    }

    get name() {
        return this.parentForm.get("name");
    }

    get description() {
        return this.parentForm.get("description");
    }

    get categoryId() {
        return this.parentForm.get("categoryId");
    }

    get price() {
        return this.parentForm.get("price");
    }
    get currency() {
        return this.parentForm.get("currency");
    }
    get slug() {
        return this.parentForm.get("slug");
    }

    get slfullDescriptionug() {
        return this.parentForm.get("fullDescription");
    }

}
