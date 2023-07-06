import { AbstractControl } from '@angular/forms';


export function dateOfBirthValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
 today.setHours(0, 0, 0, 0);
    if (selectedDate >= today) {
      return { futureDate: true };
    }

    return null;
  }