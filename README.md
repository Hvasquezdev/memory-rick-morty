# Rick and morty memory game!

A la hora de iniciar un desafio, proyecto, tarea o similares, es muy importante entender lo que se busca resolver, y teniendo en cuenta eso, uno de los primeros pasos a la hora de abordar este desafio fue entender bien lo que se buscaba lograr, lo que se buscaba construir.

Teniendo en mente el objetivo, lo que se buscaba contruir o solucionar con este desafio, mi forma de iniciar en este proyecto luego de haber leido los requerimientos, fue comenzar a revisar y entender lo que se mostraba en el figma, de modo que de esta forma ya podia ir pensando los diferentes componentes, vistas y datos necesarios para el proyecto.

Una vez hecho todo lo mencionado, comence a iniciar la base del proyecto, que seria toda esta configuracion inicial e instalacion de las herramientas necesarias, que en este sentido se construyo con la ayuda de Vite (Una alternativa a webpack mucho mas rapida, sencilla y ligera).

Teniendo instalado todo lo necesario, tocaba hacer la configuracion de algunas librerias que se utilizarian en el proyecto, como podria ser el **Router** y en conjunto con esto pude aprovechar de implementar el diseno del wrapper principal que se encargaria de mostrar el contenido de las paginas, ya que este estaria ligado al router en el sentido de que seria donde se mostraria todo su contenido.

Al haber configurado el router y realizado el maquetado del wrapper principal de la aplicacion, ya estaria listo para proceder a desarrollar lo que se podria llamar el **Core** de la aplicacion, refiriendo con esto al lugar en donde estaria toda esta logica de negocio que necesitariamos para obtener los datos que queremos mostrar en la app, dicha logica teniendo en mente que uno de los requerimientos (deseables) era utilizar **GraphQL** se procedio a realizar mediante hooks.

El primer **Modulo** de este core que implemente fue una funcionalidad **Extra** para la aplicacion, que vi conveniente agregar luego de haber entendido lo que se buscaba realizar en este desafio, dicha funcionalidad seria tener la posibilidad de mostrar personajes **aleatorios** en base al maximo de personajes que exista en la api, por lo que aprovechando las bondades de GraphQL a la hora de traer data, comence a realizar dos cosas:

- Una utilidad que me devolviera un array de numeros aleatorios (Que no se repitieran) para poder obtener IDs random de los personajes usando como limite de ese metodo "random" el maximo de personajes que devolviera la api
- Crear el hook encargado de manejar toda esta funcionalidad y devolver dicha lista de IDs

Al haber creado esta primera funcionalidad extra, ya pudimos pasar a crear la parte principal de core que seria la obtención de los personajes en donde utilizando GraphQL le estariamos pasando la lista de IDs generados previamente, para obtener estos personajes random, de modo que al juego le damos esta sensacion de "Dinamismo" por decirlo de alguna forma, y que no sea del todo repetitivo al menos en el sentido de que siempre que juegues habran personajes diferentes.

Luego de haber creado esta logica **core** el siguiente paso fue crear el componente de **CharacterCard** para comenzar a popular la vista principal, mostrando de forma ordenada los personajes que se utilizarian, para este card se utilizo una solucion en la cual se tuvieran dos caras en un plano "3D" de css de modo que pudieramos ver de forma animada cuando dicho card se volteara, y el cual nos permitia enlazar el evento click para la cara trasera, de forma de que cuando dicha card estuviera mostrando su cara frontal el evento click no se podria ejecutar para evitar este tipo de validaciones de evitar que se haga click si la card esta volteada.

Una vez creado el componente CharacterCard, se procedio a crear dos de los componentes base de la app que serian el **Title** que se creo principalmente porque los titulos utilizados en la app compartian varios estilos que podian ser reutilizados, y luego el componente **Button** que de igual forma contenia estilos reutilizables por ende ese fue el motivo para la creacion de dichos componentes base.

Teniendo lista la primera vista del Home, se procedio a trabajar el la logica principal del juego, para esta nueva vista de **/board** para este caso la decisión tomada fue separar la logica principal de la vista, de modo que fue el motivador principal para la creacion del hook **useGameManager** en donde estaria toda la logica necesaria para el funcionamiento del juego, ya sea la de hacer el shuffle de las cartas, el flip de las mismas como tambien indicar si ya hay algun ganar y los puntos del mismo, dejando asi a la vista solo la responsabilidad de pintar los datos y manejar el estado del **end-game** que seria simplemente actualizar el store y enviar al usuario a la pagina de los resultados.

Un punto extra a mencionar es que para este board, especificamente para las cards se le agrego una propiedad para que las mismas tuvieran una animacion agradable a la vista para que cuando hayan dos que hagan match cumpla con este requerimiento de que luego de 1seg las cartas matcheadas desaparezcan.

Una vez hecho el board encargado de toda la funcionalidad del juego, se procedio a realizar la vista final de los resultados, en donde simplemente utilizando el **Store** se obtienen los datos importantes a mostrar como podria ser la cantidad de puntos que le tomo al jugador completar el juego.

## Comentarios adicionales
- Se agrego un componente guarda encargado de evitar que se pudiera acceder a vistas como el board o la pagina de resultados en caso de que no se haya iniciado el juego (Haciendo click en **jugar**) o de que aun no haya un ganador.
- Se agrego un loader animado con la tematica de Rick and morty que aparecera cuando se este cargando la lista inician del usuario, de modo que sea mas "Amigable" la espera.
- En este caso se utilizo **zustand** como libreria encargada del store debido a que (En base a mi criterio habiendo probado otras librerias) considero que es mucho mas sencilla de manejar y de configurar para todo tipo de proyectos.