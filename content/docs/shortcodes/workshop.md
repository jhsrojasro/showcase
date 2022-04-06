# Workshop #1
## Convolutional Neural Networks:  
Aplicación de redes neuronales para clasificar imagenes segun el clima.
### Introducción  
#### Red neuronal convolucional (Convolutional Neural Network)
Es un algoritmo de aprendizaje profundo que toma como entrada una imagen, asigna importancia a varios aspectos u objetos de la misma y los diferencia. Lo consigue a través de la aplicación de filtros relevantes. La arquitectura de una CNN es análoga a los patrones de conectividad de neuronas del cerebro humano y fue inspirada en la organización de la corteza visual.
#### Aprendizaje por transferencia

### Contexto  
#### Clasificación de imágenes usando redes neuronales convolucionales
#### Conjunto de datos
El conjunto de datos utilizado para entrenar la red neuronal fue compartido en la plataforma Kaggle y contiene 6862 imágenes de diferentes tipos de clima, es comúnmente usado para implementar tareas de clasificación de clima basado en imágenes. Las fotos están divididas en 11 clases.
![Conjunto de datos](/img/dataset.png)  
#### Modelos de redes neuronales convolucionales

Se experimentó con dos arquitecturas de redes neuronales convolucionales:  EfficientNet y DenseNet.
##### EfficientNet
![efficientNet modulos](/img/modulos.png)
![efficientNet arquitectura](/img/efficentNet b7.png)
##### DenseNet
![efficientNet modulos](/img/denseNet.png)
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
![efficientNet modulos](/img/prediccion denseNet.png)
##### EfficientNet  
![efficientNet modulos](/img/denseNet.png)  
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
