document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('authModal');
    const btnOpenLogin = document.getElementById('open-login');
    const btnOpenRegister = document.getElementById('open-register');
    const btnClose = document.getElementById('closeModal');
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const formLogin = document.getElementById('loginForm');
    const formRegister = document.getElementById('registerForm');

    btnOpenLogin.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        switchTab('login');
    });

    btnOpenRegister.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        switchTab('register');
    });

    btnClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    function switchTab(type) {
        if (type === 'login') {
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            formLogin.classList.add('active');
            formRegister.classList.remove('active');
        } else {
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
            formRegister.classList.add('active');
            formLogin.classList.remove('active');
        }
    }

    tabLogin.addEventListener('click', () => switchTab('login'));
    tabRegister.addEventListener('click', () => switchTab('register'));

    formRegister.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        this.querySelectorAll('.form-group').forEach(el => el.classList.remove('invalid'));
        document.getElementById('agreementError').style.display = 'none';

        const name = this.name;
        const email = this.email;
        const phone = this.phone;
        const password = this.password;
        const confirmPassword = this.confirmPassword;
        const agreement = this.agreement;

        const nameRegex = /^[А-Яа-яЁё\s\-]+$/;
        if (!nameRegex.test(name.value.trim())) {
            name.closest('.form-group').classList.add('invalid');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.closest('.form-group').classList.add('invalid');
            isValid = false;
        }

        const phoneRegex = /^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        if (!phoneRegex.test(phone.value.trim())) {
            phone.closest('.form-group').classList.add('invalid');
            isValid = false;
        }

        const passwordRegex = /^(?=.*[A-Za-zА-Яа-яЁё]).{6,}$/;
        if (!passwordRegex.test(password.value)) {
            password.closest('.form-group').classList.add('invalid');
            isValid = false;
        }

        if (password.value !== confirmPassword.value) {
            confirmPassword.closest('.form-group').classList.add('invalid');
            isValid = false;
        }

        if (!agreement.checked) {
            document.getElementById('agreementError').style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            const data = { name: name.value, email: email.value, phone: phone.value, password: password.value };
            console.log('Успешная регистрация:', data);
            alert('Регистрация успешна! Данные выведены в консоль.');
            formRegister.reset();
            modal.classList.remove('active');
        }
    });

    formLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        this.querySelectorAll('.form-group').forEach(el => el.classList.remove('invalid'));

        const email = this.loginEmail;
        const password = this.loginPassword;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.closest('.form-group').classList.add('invalid');
            isValid = false;
        }

        if (password.value.length < 1) {
            password.closest('.form-group').classList.add('invalid');
            isValid = false;
        }

        if (isValid) {
            const data = { email: email.value, password: password.value };
            console.log('Успешная авторизация:', data);
            alert('Вход выполнен! Данные выведены в консоль.');
            formLogin.reset();
            modal.classList.remove('active');
        }
    });
});