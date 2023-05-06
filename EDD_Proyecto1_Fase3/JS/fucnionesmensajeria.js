let currentUser=user.item.nombre;
let selectedUser=null;

console.log("lis en mesnaje", compartidos[0])
if(compartidos.length>0){
    console.log("holis")
}


// Función para agregar un controlador de eventos click a un elemento li
function addClickEventListenerToLi(li) {
    li.addEventListener('click', function() {
        // Restablecer el color de fondo de cualquier otro elemento li seleccionado
        for (const otherLi of ul.querySelectorAll('li')) {
            otherLi.style.backgroundColor = '';
        }
        
        // Cambiar el color de fondo del elemento li haciendo clic
        li.style.backgroundColor = 'lightblue';
         // Actualizar el valor de la variable selectedUser
        selectedUser = li.textContent;
        
        // Obtener una referencia a la sección de mensajes
        const messages = document.querySelector('.messages');
        
        // Eliminar todo el contenido de la sección de mensajes
        while (messages.firstChild) {
            messages.removeChild(messages.firstChild);
        }
        
        // Crear un nuevo elemento h2 con el texto del elemento li seleccionado
        const h2 = document.createElement('h2');
        h2.textContent = li.textContent;
        
        // Agregar el nuevo elemento h2 a la sección de mensajes
        messages.appendChild(h2);
        
        // Crear un nuevo elemento div con la clase messages-container
        const newMessagesContainer = document.createElement('div');
        newMessagesContainer.classList.add('messages-container');
        
        // Agregar el nuevo contenedor de mensajes a la sección de mensajes
        messages.appendChild(newMessagesContainer);
        // Obtener una referencia al contenedor de mensajes
        const messagesContainer = document.querySelector('.messages-container');
        
        // Iterar sobre la lista de mensajes
       // Iterar sobre la lista de mensajes
for (const chatMessage of mensajeschat) {
    // Verificar si el mensaje es relevante para el chat actual
    if (chatMessage.emisor === currentUser && chatMessage.receptor === selectedUser ||
        chatMessage.emisor === selectedUser && chatMessage.receptor === currentUser) {
        // Crear un nuevo elemento div para el mensaje
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.style.maxWidth = '80%';

        // Agregar la clase sender o receiver dependiendo de si el mensaje es del emisor o del receptor
            if (chatMessage.emisor === currentUser) {
                messageElement.classList.add('sender');
                
                // Agregar un elemento span con el texto "Tú"
                const senderElement = document.createElement('span');
                senderElement.textContent = 'Tú';
                senderElement.style.fontWeight = 'bold';
                messageElement.appendChild(senderElement);
            } else {
                messageElement.classList.add('receiver');
                
                // Agregar un elemento span con el nombre del receptor
                const receiverElement = document.createElement('span');
                receiverElement.textContent = selectedUser;
                receiverElement.style.fontWeight = 'bold';
                messageElement.appendChild(receiverElement);
            }

            // Agregar un salto de línea
            messageElement.appendChild(document.createElement('br'));

            // Establecer el texto del elemento de mensaje
            const textElement = document.createElement('span');
            textElement.textContent = "   "+chatMessage.mensaje+ "   ";
            messageElement.appendChild(textElement);

            // Agregar un salto de línea
            messageElement.appendChild(document.createElement('br'));
            // Agregar un salto de línea
            messageElement.appendChild(document.createElement('br'));
            // Agregar un elemento span con la hora del mensaje
            const timeElement = document.createElement('span');
            timeElement.textContent = chatMessage.hora;
            timeElement.style.fontSize = 'smaller';
            timeElement.style.fontStyle = 'italic';
            messageElement.appendChild(timeElement);
            // Agregar el elemento de mensaje al contenedor de mensajes
            messagesContainer.appendChild(messageElement);
        }
        }
        // Crear un nuevo elemento form
        const form = document.createElement('form');
        
        // Crear un nuevo elemento input con la clase msuser
        const input = document.createElement('textarea');
        input.classList.add('msuser');
        input.placeholder = 'Escribe un mensaje';
        
        // Agregar el nuevo elemento input al nuevo elemento form
        form.appendChild(input);
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary');
        button.type = 'button';
        button.textContent = 'Enviar';
        button.addEventListener('click', enviarmensaje);

        // Agregar el nuevo elemento button al nuevo elemento form
        form.appendChild(button);

        // Agregar el nuevo elemento form a la sección de mensajes
        messages.appendChild(form);
    });
}

// Obtener una referencia a la lista ul
const ul = document.querySelector('.chats ul');

// Agregar un controlador de eventos click a cada elemento li en la lista ul
for (const li of ul.querySelectorAll('li')) {
    addClickEventListenerToLi(li);
}

// Obtener una referencia al elemento select
let formSelect = document.querySelector('#EstudiantesReg');
// Agregar un controlador de eventos change al elemento select
formSelect.addEventListener('change', function() {
    // Obtener el índice de la opción seleccionada
    const selectedIndex = formSelect.selectedIndex;
    
    // Verificar si el índice de la opción seleccionada es 0
    if (selectedIndex === 0) {
        // No agregar el elemento a la lista
        return;
    }
    
    // Obtener la opción seleccionada
    const selectedOption = formSelect.options[selectedIndex];
    
    // Obtener el texto de la opción seleccionada
    const selectedText = selectedOption.text;
    
    // Verificar si el texto seleccionado ya existe en la lista ul
    let exists = false;
    for (const li of ul.querySelectorAll('li')) {
        if (li.textContent === selectedText) {
            exists = true;
            break;
        }
    }
    
    // Si el texto seleccionado no existe en la lista ul, agregarlo
    if (!exists) {
        const li = document.createElement('li');
        li.textContent = selectedText;
        ul.appendChild(li);
        
        // Agregar un controlador de eventos click al nuevo elemento li
        addClickEventListenerToLi(li);
        
        // Disparar el evento click en el nuevo elemento li para mostrar su contenedor de mensajes
        li.click();
    } else {
        // Si el texto seleccionado ya existe en la lista ul, encontrar el elemento li correspondiente y disparar su evento click para mostrar su contenedor de mensajes
        for (const li of ul.querySelectorAll('li')) {
            if (li.textContent === selectedText) {
                li.click();
                break;
            }
        }
    }
});

function enviarmensaje() { 
// Obtener el valor del input del mensaje
const message = document.querySelector('.msuser').value; 
    // Agregar el nuevo mensaje a la lista mensajeschat 
    mensajeschat.push({ emisor: currentUser, receptor: selectedUser, mensaje: message }); 
    // Crear un nuevo elemento div para el mensaje 
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'sender'); 
    // Agregar un elemento span con el texto "Tú" 
    const senderElement = document.createElement('span'); 
    senderElement.textContent = 'Tú';
    messageElement.appendChild(senderElement);
    // Agregar un salto de línea 
    messageElement.appendChild(document.createElement('br')); 
    // Establecer el texto del elemento de mensaje
    const textElement = document.createElement('span'); 
    textElement.textContent = message;
    messageElement.appendChild(textElement); 
    // Agregar un salto de línea 
    messageElement.appendChild(document.createElement('br'));
    messageElement.appendChild(document.createElement('br')); 
    // Agregar un elemento span con la hora del mensaje c
    const timeElement = document.createElement('span');
    timeElement.textContent = new Date().toLocaleTimeString();
    const date = new Date();
    const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateString = date.toLocaleString('es-ES', options);
    const options1 = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const dateString1 = date.toLocaleString('es-ES', options1);
    const formattedDate = dateString.replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/, '$1-$2-$3::$4:$5:$6');
    const formattedDate1 = dateString1.replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+)/, '$1-$2-$3  4:$5');
    timeElement.textContent = formattedDate1;
    messageElement.appendChild(timeElement); 
    // Agregar el elemento de mensaje al contenedor de mensajes
    const messagesContainer = document.querySelector('.messages-container');
    messagesContainer.appendChild(messageElement); 
    document.querySelector('.msuser').value = '';
}

let select = document.getElementById("EstudiantesReg");

for (let i = 0; i < estudents.length; i++) {
    let option = document.createElement("option");
    option.text = estudents[i];
    option.value = estudents[i];
    select.add(option);
}

for (let i = 0; i < mensajeschat.length; i++) {
    let texto = "";
    if (mensajeschat[i].emisor === currentUser) {
        texto = mensajeschat[i].receptor;
    } else if (mensajeschat[i].receptor === currentUser) {
        texto = mensajeschat[i].emisor;
    }
    
    // Verificar si el texto ya existe en la lista ul
    let exists = false;
    for (const li of ul.querySelectorAll('li')) {
        if (li.textContent === texto) {
            exists = true;
            break;
        }
    }
    
    // Si el texto no existe en la lista ul, agregarlo
    if (!exists) {
        let li = document.createElement("li");
        li.textContent = texto;
        ul.appendChild(li);
        
        // Agregar un controlador de eventos click al nuevo elemento li
        addClickEventListenerToLi(li);
        
    }
}