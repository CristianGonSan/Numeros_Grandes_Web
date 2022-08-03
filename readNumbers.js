"use strict";

/**
 * Este codigo resive un una cifra de numeros como string y retorna otro string con su escritura.
 * @param {string} numbers 
 * @returns string
 */

//Este codigo es una transcripción de mi codigo originalmente escrito en Java.
//Se sustituyo la funcion "Number" por "+" para convertir un string a numero, ambos hacen lo mismo.
function read(numbers){
    //Estas matrices y arreglos contienen los strings basicos para construir numeros muy grandes como el vigitillon.
    let unidades = [["Cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"], ["", "once", "doce", "trece", "catorce", "quince"]];
    let decenas  = [["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"], ["", "diesi", "veinti", "treinta y ", "cuarenta y ", "cincuenta y ", "sesenta y ", "setenta y ", "ochenta y ", "noventa y "]];
    let centenas = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
    let illones  = ["", "m", "b", "tr", "cuatr", "quint", "sext", "sept", "oct", "non", "dec", "undec", "duoc", "tredec", "cuatordec", "quintedec", "sexdec", "septedec", "octodec", "novendec", "vigit"];
    // Se declara una variable string vacia.
    let pronunciation = "";
    //Si la cadena solo tiene un numero es una unidad.
    if (numbers.length == 1)
    {
        //Optenemos el valor numerico del caracter.
        let value = +(numbers.charAt(0));
        //Buscamos en la posicion del arreglo que de el valor.
        pronunciation += (unidades[0][value]);
    }
    else
    {
        //Se establese la posicion de inicio.
        let position = (numbers.length % 3);
        if (position == 1)
            {
                position = 2;
            }
            else if (position == 2)
            {
                position = 1;
            }
        //Estas variables cuentan la cantidad de numeros que hay cada 3, 6 y total. Si solo hay ceros, la variables seran 0.
        //Estas variable indicaran cuando hayq ue poner mil o miles, millon o millones o si todos los numero son ceros.
        let amongMillions = 0;  //Numero entre millones o cada 6.
        let amongThousands = 0; //Numero entre milles o cada 3.
        let totalNumbers = 0;   //Numeros de todo el string que no sean 0.
        //Este for recorera cada uno de los caracteres del string.
        for (let i = 0; i < numbers.length; i++)
        {
            let value = +(numbers.charAt(i));
            if (value != 0)
            {
                //Si la condición entro aqui, significa que el numero no es 0.
                amongMillions++;
                amongThousands++;
                totalNumbers++;

                //Dependiendo de la posicion del numero sera conciderado como centena, decena o unidad.
                switch (position) 
                {
                case 0:
                    // Centenas
                    if (value == 1 && +(numbers.charAt(i+1)) == 0 && +(numbers.charAt(i+2)) == 0)
                    {
                        pronunciation += ("cien ");
                    }
                    else 
                    {
                        pronunciation += (centenas[value]);
                        pronunciation += (" ");
                    }
                    break;
                case 1:
                    // Decenas
                    if (value == 1 && +(numbers.charAt(i+1)) < 6 && +(numbers.charAt(i+1)) > 0)
                    {
                        pronunciation += (unidades[1][+(numbers.charAt(i+1))]);
                        pronunciation += (" ");
                    }
                    else if (+(numbers.charAt(i+1)) == 0)
                    {
                        pronunciation += (decenas[0][value]);
                        pronunciation += (" ");
                    }
                    else if ((i + 2) != numbers.length && +(numbers.charAt(i+1)) == 1)
                    {
                        if (value == 2)
                        {
                            pronunciation += (decenas[1][2]);
                        }
                        else 
                        {
                            pronunciation += (decenas[0][value]);
                            pronunciation += (" ");
                        }
                    }
                    else 
                    {
                        pronunciation += (decenas[1][value]);
                    }
                    break;
                case 2:
                    /*****ESTE BLOQUE ESTA BAJO REVISION-->*****/

                    // Unidades
                    //Condicionales solo en caso de uno
                    if (value == 1)
                    {
                        //Solo si nos encontramos en el primer digito 
                        if (i == 0)
                        {
                            if ((((numbers.length - (i + 1)) % 6)) == 0)
                            {
                                pronunciation += ("un ");
                            }
                        }
                        //Con este codigo nos "quitamos de encima" al 11,12,13,14 y 15, simplemente no ponemos nada.
                        else if (+(numbers.charAt(i-1)) == 1 && value < 6)
                        {
                            //No hace nada.
                        }
                        //Si no es el primero, entonces vemos si es el ultimo .
                        else if ((i + 1) == numbers.length)
                        {
                            pronunciation += (unidades[0][value]);
                        }
                        //Si el numero anterior es mayor a 1 .
                        else if (+(numbers.charAt(i-1)) > 1)
                        {
                            //Si el numero anterior es 2.
                            if (+(numbers.charAt(i-1)) == 2)
                            {
                                //Solo esta decena lleva "un" en lugar de "y un".
                                pronunciation += ("un ");
                            }
                            //Si no es 1 y no es 2, entones ponemos "y un", ejemplo: "treinta y un mil,cuarenta y un millones"
                            else 
                            {
                                pronunciation += ("y un ");
                            }
                        }
                        //Condicion semi excluciva para 101,201,301, etc.
                        else if (+(numbers.charAt(i-1)) > 1 || (+(numbers.charAt(i-1)) == 0 && +(numbers.charAt(i-2)) > 0))
                        {
                            pronunciation += ("un ");
                        }
                    }
                    //Si no es uno, no hay no problemas, solo si no es 11,12,13,14 o 15.
                    else if (i > 0)
                    {
                        if (+(numbers.charAt(i-1)) == 1 && value < 6)
                        {
                        }
                        else 
                        {
                            pronunciation += (unidades[0][value]);
                            pronunciation += (" ");
                        }
                    }
                    else 
                    {
                        pronunciation += (unidades[0][value]);
                        pronunciation += (" ");
                    }
                    break;
                    /*****<---ESTE BLOQUE ESTA BAJO REVISION*****/
                }
            }
            // Fin de la condicional
            //Este bloque se encarga de agregar los miles o millones, asi como su variables mil o millon.
            position++;
            if (position > 2)
            {
                if ((((numbers.length - (i + 1)) % 6)) == 0 && (i + 1) != numbers.length)
                {
                    if (amongMillions != 0)
                    {
                        pronunciation += (illones[(numbers.length - (i + 1)) / 6]);
                        if (amongMillions == 1 && value == 1)
                        {
                            pronunciation += ("illón ");
                        }
                        else 
                        {
                            pronunciation += ("illones ");
                        }
                        amongMillions = 0;
                    }
                }
                else if (amongThousands > 0 && (i + 1) != numbers.length)
                {
                    pronunciation += ("mil ");
                }
                amongThousands = 0;
                position = 0;
            }
        }
        // Fin de bucle principal
        if (totalNumbers == 0)
        {
            pronunciation += ("Cero");
        }
    }
    // Fin del else principal
    return pronunciation;
}

/**
 * Esta funcion es llamada por un boton en HTML
 * Esta funcion extrae el texto del input text y
 * llama la funcion read para poner el resultado en un div.
 */
function traducir(){
    let traduccion = document.getElementById("numero"); 
    document.getElementById("divTexto").textContent = read(traduccion.value);
}
/**
 * Esta funcion es llamada por un boton en HTML
 * Regresa el input text y el div a su estado inicial
 */
function borrar(){
    document.getElementById("numero").value = "";
    document.getElementById("divTexto").textContent = "Cero";
}
/**
 * Esta funcion es llamada cada vez que el input text resive un caracter
 * Evalua si el caracter es un numero para ponerlo u omitirlo en caso contrario
 * Tambien llama a la funcion traduccir si es un enter,
 * @param {evento} evt 
 * @returns boolean
 */
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if(charCode == 13){
        traducir();
    }else{
        if (charCode > 31 && (charCode < 48 || charCode > 57)){
            evt.preventDefault();
        }
        else{
            return true;
        } 
    }
        
}
