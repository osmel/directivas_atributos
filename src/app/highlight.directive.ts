/*
1. Directive: Proporciona la funcionalidad del decorador @Directive.
2. ElementRef: se "inyecta en el constructor de la directiva" para que el código pueda acceder al elemento DOM.
3. Input: permite que los "datos fluyan de la expresión vinculante a la directiva".
*/

import { Directive, ElementRef, HostListener, Input } from '@angular/core';




/*
@Directive: 
   Metadatos:
	selector CSS para identificar el HTML en la plantilla asociada con la directiva. 
	 "nombre del atributo entre corchetes". 
	  Angular localiza todos los elementos de la plantilla que tienen un atributo llamado myHighlight.
*/
@Directive({
  selector: '[myHighlight]'
})

/*
"Clase de controller de la directiva": Contiene la lógica de la directiva. 
export: hace accesible a otros componentes.
Angular crea una nueva instancia de la clase controller de la directiva para cada elemento coincidente, 
*/





export class HighlightDirective {
    constructor(private el: ElementRef) {
    	this.el.nativeElement.style.backgroundColor = 'blue';
    } //ElementRef: Es un servicio que "concede acceso directo al elemento DOM" a través de su "propiedad nativeElement".
       

       		/*
					Pasar valores a la directiva con una "vinculación de datos @Input"
					decorador @Input". Añade metadatos a la clase que hace que la propiedad highlightColor de la directiva esté disponible para la vinculación.
										Agregar una propiedad highlightColor a la clase de directiva
					 Se llaman "propiedad de entradas": porque los datos fluyen de la expresión de vinculación en la directiva. 
       	
			ejemplos con:        @Input() highlightColor: string;
					<p myHighlight highlightColor="yellow">Resaltado amarillo</p>
					<p myHighlight [highlightColor]="'orange'">Resaltado naranja</p>
					<p myHighlight [highlightColor]="color">Color personalizado con vinculo de propiedad</p>
       		*/

       	  @Input() highlightColor: string;
		  @Input() defaultColor: string;




		  /*
			Aplicar simultáneamente la directiva y establecer el color en el mismo atributo como este.
					@Input() myHighlight: string;
		  			this.highlight(this.myHighlight || this.highlightColor || this.defaultColor || 'red');

				<p [myHighlight]="color">Highlight me!</p>


		  */
		  @Input() myHighlight: string;


		  /*
		  "
		     -- 
		           Sin esos metadatos de entrada, "Angular rechaza la vinculación; vea más abajo para más información sobre eso".
					Pruébelo agregando las siguientes variaciones de vinculación de directiva a la plantilla AppComponent:

		  	
		  */
  		  //@Input('myHighlight') highlightColor: string;


  		/*	  
			La directiva podría ser más dinámica. Podría detectar cuando el usuario entra o sale del elemento y responde ajustando o borrando el color de resaltado.
			Agregar eventhandlers(mouseenter, mouseleave): que responden cuando el ratón entra o sale, cada uno adornado por el "decorador HostListener".

			"decorador @HostListener": permite suscribirse a eventos del elemento DOM que hospedan(host) de una directiva de atributo. En este caso el host es la <p>.

		*/		 

		  @HostListener('mouseenter') onMouseEnter() {
		       //this.el.nativeElement.style.backgroundColor = (this.highlightColor || this.defaultColor || 'red');
		       //this.highlight(this.highlightColor || this.defaultColor || 'red');
		       this.highlight(this.myHighlight || this.highlightColor || this.defaultColor || 'red');
		  }

		  @HostListener('mouseleave') onMouseLeave() {
		    this.el.nativeElement.style.backgroundColor =null
		    //this.highlight(null);

		  }

		  private highlight(color: string) {
		    this.el.nativeElement.style.backgroundColor = color;
		  }


    
}
