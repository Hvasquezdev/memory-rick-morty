# Rick and morty memory game!

### Pasos para correr el proyecto en local:
- Crear un archivo `.env` con la variable `VITE_API_URL=<API_URL_HERE>`
- Instalar las dependencias `npm install`
- En la consola escribir `npm run dev`
---

Para el desarrollo de este proyecto, luego de haber entendido la logica funcional del mismo, y siguiendo lo planteado en el diseno propuesto de figma, se pudieron definir los siguientes componentes necesarios para la aplicacion:

- Button:
Componente base el cual se realizo con objetivos de reutilizacion de estilos.

- Title:
Componente base que se realizo debido a que en el diseno planteado muchos de los titulos utilizados compartian estilos que podian ser reutilizados

- Loader:
Componente encargado de mostrar un loader animado con la tematica del proyecto que seria utilizado a la hora de cargar los personajes

- Shared -> Header:
El header principal de la aplicacion, se tomo la decisión de colocarlo en la carpeta **shared** debido a que seria un componente compartido para todas las vistas

- CharacterCard:
Componente encargado de mostrar toda la informacion de un personaje.
Para este componente se utilizo una solucion en la cual se tuvieran dos caras en un plano "3D" de css. Esta solucion otorga dos ventajas:
-- Al voltear la tarjeta, utilizar el plano 3D permite poder ver dicha accion de forma animada
-- Al manejar la tarjeta con dos caras (front-face y back-face) permite enlanzar el evento click solo a la cara trasera evitando de esta forma tener que validar click innecesarios cuando se este mostrando su cara frontal.

- CharacterList:
Componente encargado de ordernar los **CharacterCard** en un grid, este componente se creo debido a que se mostraria en varios lugares la lista de tarjetas, y esto nos ayuda tanto a la reutilizacion del mismo grid como a su modificacion haciendo esto en un solo lugar.

Teniendo definidos los componentes base del proyecto, se definieron y crearon las siguientes vistas:

- Home:
Esta vista seria la encargada de mostrar los personajes que se utilizaran en el juego, los cuales serian renderizados de forma ordenada con sus pares repetidos.
En esta vista seria el punto donde se hara la obtencion de los personajes iniciales utilizando los hooks encargados de esto, que seran explicados mas adelante.

- Board:
Vista encargada de mostrar el tablero de juego, con los personajes ya mezclados y de mostrar el puntaje, aciertos y estado final del juego utilizando el game manager que sera explicado mas adelante.

- Results:
La vista final del proyecto, seria un componente basico encargado de mostrar un mensaje de celebracion como tambien la cantidad de puntos que se obtendrian del store del juego, como tambien la lista de acciones disponibles (Ir al inicio y Repetir juego).

Con las vistas y componentes ya definidos el siguiente paso es la definicion y creacion de esta logica de negocio del juego, en donde se realizo creando los siguientes hooks:

- useCharactersRandomIds:
Para poder agregar un poco mas de "aleatoriedad" al juego, se implemento esta solucion que utilizando **GraphQL** se obtuvo el total de personajes que existen en el api, teniendo esta informacion, con ayuda de una utilidad que se creo **getRandomUniqueNumbers** se le pasa como parametro el total de personajes y nos devuelve una lista de IDs unicos que utilizaremos para obtener los diferentes personajes.

- useCharactersByIds:
Este hook seria encargado de devolver una lista de multiples personajes en donde para hacer esto primero estaria recibiendo una lista de IDs de los personajes que queremos obtener.

Luego de realizar la logica **Core** para obtener los datos necesarios, se comenzo con el desarrollo del **Game Manager**.

El **Game Manager** seria un hook encargado de manejar toda la logica del juego, refiriendome con esto al mezclado de los personajes, el manejo de los puntos, aciertos y si ya hay un ganador.

Se tomo la decision de crear este **Game Manager** y no hacerlo en la vista de **/board** para evitar "manchar" la vista con logica que puede ser manejada por un servicio o en este caso un hook. Esto tiene la ventaja de un mejor control tanto de la logica pura del juego como tambien de la vista al estar separados manteniendo responsabilidades separadas.

Una vez definidos los componentes, vistas y esta logica principal, dos puntos importantes que tambien hay que mencionar seria el **Store** y validaciones para las distintas rutas.

Se utilizo **zustand** para el manejo del **Store**, en donde se creo un solo **Store** encargado de manejar los datos escenciales que necesitaban ser compartidos, los cuales serian:

- La lista de personajes: **characters**
- La cantidad de turnos jugados: **turnsPlayer**
- Si se esta jugando: **isPlaying**
- Si ya hay un ganador: **isWinner**

Para la validacion de rutas se creo un componente guarda que se encarga de evitar que se renderize el componente hijo si no se cumple la validacion necesaria.

Este componente guarda se creo para evitar el acceso a la pagina de **/board** en caso de que no se este jugando, y de esta forma se fuerza al usuario a hacer click en **Jugar** para iniciar el juego, y para evitar que se acceda a la pagina de **/results** en caso de que aun no haya ganador.