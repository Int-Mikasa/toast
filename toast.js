window.onload = () => {
    document.querySelector(".btn").onclick = () => {
        let text = document.querySelector('#msg').value;
        document.querySelector('#msg').value = ''
        let toast = document.createElement('div');
        let notificationBlock = document.createElement('div')
        let notification_msg = document.createElement('span')
        let notification_close = document.createElement('span')
        notification_close.classList.add('notification_close')
        notificationBlock.classList.add('notification_block')
        notification_msg.classList.add('notification_msg')
        notification_msg.innerText = text
        notification_close.innerText = '×';
        toast.classList.add('notification');
        $(toast).append(notificationBlock)
        $(notificationBlock).append(notification_msg, notification_close)

        if(text == "") {
            alert('Заполните все поля!!')
            return
        }
        document.body.appendChild(toast)

        setTimeout(() => {
            toast.remove()
        }, 5000)

        notification_close.onclick = () => {
            toast.remove()
        }
    }
}