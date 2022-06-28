# Fotomosaico por hardware

## Explicación fotomosaico por hardware

La implementación del fotomosaico se puede realizar a través de hardware, es decir, la construcción de un algoritmo que se encargue de convertir la imagen original en un mosaico de otras.

En este ejercicio por hardware hacemos uso de varias fuentes para aplicar el fotomosaico como lo es la imagen de Cristiano Ronaldo, un video montado dentro del repositorio y tambien se puede hacer uso del video que se obtiene desde la camara del computador.

En la funcion `preload` definimos el fragmento a usar demoninado `photomosaic.frag`, a partir de ahi al mosaico final vamos a definir ciertos parametros que van a ser obtenidos al momento de recorrer la imagen, aqui se comparan los texeles del color promedio que posee cada pixel de la imagen o video original.

Los colores promedio de la imagen original son comparados con la imagen devuelta por el quadrille, haciendo uso de una tolerancia que va aumentando hasta encontrar el color mas cercano al del original y de esta forma ese color encontrado es el que se usa para llenar en la imagen que se muestra como resultado.

{{< p5-iframe sketch="/vc/sketches/photomosaic.js" lib1="/vc/sketches/libraries/p5.shaderbox.js" lib2="/vc/sketches/libraries/p5.quadrille.js" width="675" height="675" >}}

Al igual tanto al resultado como previsualización en ambos ejercicios (hardware/software) se le agrego una estadistíca de frames por segundo para comparar los ejercicios.
