# Workshop #1
## Convolutional Neural Networks:  
Aplicación de redes neuronales para clasificar imagenes segun el clima.
### Introducción  
#### Red neuronal convolucional (Convolutional Neural Network)
Es un algoritmo de aprendizaje profundo que toma como entrada una imagen, asigna importancia a varios aspectos u objetos de la misma y los diferencia. Lo consigue a través de la aplicación de filtros relevantes. La arquitectura de una CNN es análoga a los patrones de conectividad de neuronas del cerebro humano y fue inspirada en la organización de la corteza visual.

Una red neuronal convolucional puede capturar con éxito las dependencias espaciales y temporales de una imagen mediante la aplicación de filtros. La arquitectura realiza un mejor ajuste al conjunto de datos de la imagen debido a la reducción en la cantidad de parámetros involucrados y la reutilización de los pesos. En otras palabras, la red puede ser entrenada para comprender mejor la sofisticación de la imagen.

Imagen de Entrada:

<img width="345" alt="dataset" src="https://user-images.githubusercontent.com/55771991/161895985-e847bcc6-010f-41bc-a251-17c9d5c1bd55.png"> 

En la figura, tenemos una imagen RGB que ha sido separada por sus tres planos de color: rojo, verde y azul.
Desde el punto de vista computacional se volverían intensas las cosas una vez que las imágenes alcanzarán dimensiones de 8K (7680 × 4320). El papel de redes convolucionales es reducir las imágenes a una forma que sea más fácil de procesar, sin perder características que son críticas para obtener una buena predicción. 

Capa de convolución: el kernel:

<img width="345" alt="dataset" src="https://miro.medium.com/max/1052/1*GcI7G-JLAQiEoCON7xFbhg.gif"> 

La sección verde se asemeja a nuestra imagen de entrada de 5x5x1. El elemento involucrado en la realización de la operación de convolución en la primera parte de una Capa Convolucional se llama Kernel/Filtro, K, representado en color amarillo. Hemos seleccionado K como matriz de 3x3x1.

<img width="345" alt="dataset" src="https://miro.medium.com/max/1400/1*ciDgQEjViWLnCbmX-EeSrA.gif"> 

En el caso de imágenes con múltiples canales (por ejemplo, RGB), el Kernel tiene la misma profundidad que la de la imagen de entrada. La multiplicación de matrices se realiza entre Kn e In stack ([K1, I1]; [K2, I2]; [K3, I3]) y todos los resultados se suman con el sesgo para darnos una salida de características contorneadas de un canal aplastado.

<img width="345" alt="dataset" src="https://miro.medium.com/max/790/1*1VJDP6qDY9-ExTuQVEOlVg.gif"> 

El objetivo de la operación de convolución es extraer las características de alto nivel, como los bordes, de la imagen de entrada. No necesitan estar limitadas a una sola capa convolucional. Convencionalmente, el primer ConvLayer es responsable de capturar las características de bajo nivel, como los bordes, el color, la orientación del degradado, etc. Con capas adicionales, la arquitectura también se adapta a las características de alto nivel, brindándonos una red que tiene la comprensión completa de imágenes en el conjunto de datos.
Hay dos tipos de resultados para la operación: uno en el que la característica convolucionada se reduce en dimensionalidad en comparación con la entrada, y el otro en el que la dimensionalidad aumenta o permanece igual. Esto se hace aplicando Valid Padding en el caso del primero, o Same Padding en el caso del segundo.

<img width="345" alt="dataset" src="https://miro.medium.com/max/790/1*nYf_cUIHFEWU1JXGwnz-Ig.gif"> 

Cuando aumentamos la imagen de 5x5x1 a una imagen de 6x6x1 y luego aplicamos el kernel de 3x3x1 sobre ella, encontramos que la matriz convolucionada resulta ser de dimensiones 5x5x1. De ahí el nombre: el mismo relleno.
Por otro lado, si realizamos la misma operación sin relleno, se nos presenta una matriz que tiene las dimensiones del propio Kernel (3x3x1): Relleno válido.

#### Aprendizaje por transferencia

### Contexto  
#### Clasificación de imágenes usando redes neuronales convolucionales  
#### Conjunto de datos  
El conjunto de datos utilizado para entrenar la red neuronal fue compartido en la plataforma Kaggle y contiene 6862 imágenes de diferentes tipos de clima, es comúnmente usado para implementar tareas de clasificación de clima basado en imágenes. Las fotos están divididas en 11 clases.  
<img width="345" alt="dataset" src="https://user-images.githubusercontent.com/39863678/161894269-8e193d10-4a1e-4d60-8e65-787f5d4a1b55.PNG"> 
#### Modelos de redes neuronales convolucionales

Se experimentó con dos arquitecturas de redes neuronales convolucionales:  EfficientNet y DenseNet.
##### EfficientNet  
<img width="547" alt="modulos" src="https://user-images.githubusercontent.com/39863678/161894334-5861b7ac-6c3f-4fef-93f4-1bd3d38db0d6.PNG">

<img width="562" alt="efficientNet b7" src="https://user-images.githubusercontent.com/39863678/161894363-bf2332f2-874c-4b11-9558-807272d3841c.PNG">

##### DenseNet  
<img width="422" alt="denseNet" src="https://user-images.githubusercontent.com/39863678/161894387-6a4c6adc-e62e-4654-bef9-11e379c2f9d1.PNG">  

### Resultados  
Del entrenamiento de ambos modelos, se obtuvieron las siguientes métricas:
<table>
<thead>
  <tr>
    <th>Modelo</th>
    <th>Pérdida</th>
    <th>Accuracy</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>EfficientNet B7</td>
    <td>0.68872</td>
    <td>76.04%</td>
  </tr>
  <tr>
    <td>DenseNet201</td>
    <td>0.58884</td>
    <td>84.34%</td>
  </tr>
</tbody>
</table>
Es claro que el modelo DenseNet tuvo mejor desempeño en el conjunto de datos de entrenamiento, sin embargo en la prueba que se planteó con imágenes de la Universidad, las clasificaciones de este modelo no fueron tan buenas como las de EfficientNet:  

##### DenseNet  
<img width="512" alt="prediccion denseNet" src="https://user-images.githubusercontent.com/39863678/161894404-dedb773e-2fd9-414c-aebc-3c23b7fe8ab4.PNG">  

##### EfficientNet  
<img width="415" alt="prediccion efficientNet" src="https://user-images.githubusercontent.com/39863678/161894416-5f2028cb-d7b5-4e85-ac5e-61295c192d7d.PNG">  

El modelo DenseNet presenta un claro sobreajuste al conjunto de datos, no generaliza bien la función clasificadora.

### Conclusiones  
<ul>
  <li>Las redes neuronales convolucionales son aproximadores de funciones con los que se puede resolver el problema de clasificación de imágenes según el clima presente.</li> 
  <li>Se entrenaron dos modelos de redes neuronales populares usando un conjunto de datos público.</li>
  <li>Uno de los modelos entrenados pudo clasificar parcialmente las imágenes de prueba de la universidad.</li>
</ul>  

### Trabajo Futuro  
Como trabajo futuro se recomiendan los siguientes caminos:
<ul> 
  <li>Probar con otras arquitecturas de redes neuronales convolucionales.</li>
  <li>Probar diferentes configuraciones de hiper parámetros de los modelos para determinar si se pueden obtener mejores resultados.</li>
  <li>Probar otras técnicas de clasificación de imágenes</li>
  <li>Migrar los modelos a tensorflow.js y ml5 para facilitar su visualización en entornos web.</li>
</ul>   

### Notebook   
https://colab.research.google.com/drive/1b9sXwW_IOtLZ4BzwTOUcfQmpo7fS5M_u?usp=sharing   

### Referencias
<ul>
  <li>Chahar, Vijay & Jaiswal, Aayush & Gianchandani, Neha & Singh, Dilbag & Kaur, Manjit. (2020). Classification of the COVID-19 infected patients using DenseNet201 based deep transfer learning. Journal of biomolecular Structure & Dynamics. 39. 10.1080/07391102.2020.1788642.</li>
  <li>Sumit Saha. A Comprehensive Guide to Convolutional Neural Networks — the ELI5 way. Towars Data Science. 2018</li>
</ul>
