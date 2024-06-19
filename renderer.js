document.getElementById('addTask').addEventListener('click', function() {
    const taskName = document.getElementById('taskName').value;
    const taskTime = new Date(document.getElementById('taskTime').value).getTime();

    if (taskName && !isNaN(taskTime)) {
        localStorage.setItem(taskName, taskTime);
        displayTasks();
        setUpReminder(taskName, taskTime);
    } else {
        alert('請填寫任務名稱和正確的時間。');
    }
});

function displayTasks() {
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const taskName = localStorage.key(i);
        const taskTime = parseInt(localStorage.getItem(taskName));
        const now = new Date().getTime();

        if(taskTime < now) {
            continue; // Skip rendering past tasks
        }

        const taskItem = document.createElement('div');
        taskItem.textContent = `${taskName} - ${new Date(taskTime).toLocaleString()}`;

        tasksList.appendChild(taskItem);
    }
}

function setUpReminder(taskName, taskTime) {
    const now = new Date().getTime();
    const delay = taskTime - now;
    
    if (delay > 0) {
        setTimeout(() => {
            const reminderAudio = document.getElementById('reminderAudio');
            reminderAudio.play().then(() => {
                reminderAudio.onended = function() {
                    alert(`任務提醒: ${taskName}`);
                    localStorage.removeItem(taskName); // 删除任务
                    displayTasks(); // 更新任务列表
                };
            });
        }, delay);
    }
}

function hideElements() {
    // 假设有id为"fileMenu"的元素要隐藏
    document.getElementById('fileMenu').style.display = 'none';
    // 如果还有其它具体元素，重复上面的步骤
}

window.onload = function() {
    displayTasks();
    hideElements(); // 页面加载时执行隐藏操作
};