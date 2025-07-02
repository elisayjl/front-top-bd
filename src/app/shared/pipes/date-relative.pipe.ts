// src/app/pipes/date-relative.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRelative',
  standalone: true
})
export class DateRelativePipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';
  
    const now = new Date();
    const publishedDate = new Date(value);
  
    // Zera horas, minutos, segundos e milissegundos para comparar só as datas
    now.setHours(0, 0, 0, 0);
    publishedDate.setHours(0, 0, 0, 0);
  
    const diffTime = now.getTime() - publishedDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays > 365) {
      const years = Math.floor(diffDays / 365);
      return `há ${years} ${years === 1 ? 'ano' : 'anos'}`;
    }
    if (diffDays > 30) {
      const months = Math.floor(diffDays / 30);
      return `há ${months} ${months === 1 ? 'mês' : 'meses'}`;
    }
    if (diffDays > 0) {
      return `há ${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
    }
  
    // Se for hoje, calcular horas, minutos, segundos como antes
    const diffSeconds = Math.floor((Date.now() - new Date(value).getTime()) / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
  
    if (diffHours > 0) return `há ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    if (diffMinutes > 0) return `há ${diffMinutes} ${diffMinutes === 1 ? 'minuto' : 'minutos'}`;
    return `agora mesmo`;
  }
}
  