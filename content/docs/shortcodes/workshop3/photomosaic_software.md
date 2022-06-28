# Fotomosaico por software

## Explicación fotomosaico por software

La implementación del fotomosaico también se puede realizar por medio de software, es decir, la construcción de un algoritmo que se encargue de convertir la imagen original en un mosaico de otras.

Dicho algoritmo, se inicia con una división de la imagen original en cuadrados del mismo tamaño, esto para poder calcular el color promedio en formato RGB que esta presente en esa área de la imagen original, este conjunto de colores promedios son almacenados en un vector. Posterior a esto, cada uno de los integrantes de este vector se comparan con las imágenes que están disponibles para ser usadas en el mosaico, con el fin de que la imagen que se va incrustar en esa área concuerde con el color promedio del retrato original, al encontrar la imagen que mas se acerque al color deseado, se le cambia el tamaño para que se acomode con las medidas de las figuras geométricas y se va agregando a la nueva imagen en el mismo orden del arreglo de los colores promedio.

{{< p5-iframe sketch="/showcase/sketches/photomosaicSoftware.js" width="750" height="600" >}}

La implementación anterior, fue realizada para una fotografía y un video con un conjunto de 23 imágenes, adicionalmente se implemento un botón que se puede desplazar para poder visualizar la diferencia de resolución que se va adquiriendo a medida de que se usan mas imágenes en áreas mas pequeñas.

Con ambos ejercicios desarrollados podemos observar que el fotomosaico por software es costoso computacionalmente comparado al de hardware en donde se hace uso de la GPU que posee el computador por lo que no es costoso, esta implementación fue hecha para el procesamiento en procesador gráficos dedicados que son los mas adecuados para el procesamiento de imágenes o videos
