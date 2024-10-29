document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mentoriaForm');
    let formSubmitted = false; 
    let isMinimized = false; 

    document.addEventListener('selectstart', (e) => {
        e.preventDefault();
    });

    document.addEventListener('copy', (e) => {
        e.preventDefault();
    });

    form.querySelectorAll('input, textarea').forEach((input) => {
        input.addEventListener('paste', (e) => {
            e.preventDefault();
        });
    });

    const autoResizeTextarea = (textarea) => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const textareas = form.querySelectorAll('textarea');
    textareas.forEach((textarea) => {
        textarea.addEventListener('input', () => autoResizeTextarea(textarea));
        autoResizeTextarea(textarea);
    });

    
    window.onblur = () => {
        if (!formSubmitted) { 
            isMinimized = true; 
            alert("Você minimizou ou mudou de aba! O formulário será reiniciado.");
            form.reset(); 
        }
    };


    window.onfocus = () => {
        isMinimized = false;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const nivel = form.nivel.value;
        const dia = form.dia.value;
        const pergunta1 = form.pergunta1.value.trim();
        const pergunta2 = form.pergunta2.value.trim();
        const naoSabe1 = form.naoSabe1.checked;
        const naoSabe2 = form.naoSabe2.checked;

        if ((pergunta1 === '' && !naoSabe1) || (pergunta2 === '' && !naoSabe2)) {
            alert("Por favor, responda as perguntas ou marque a opção 'Não sei responder'.");
            return;
        }

        emailjs.send('service_amqsdiv', 'template_rv74ysl', {
            name: name,
            email: email,
            phone: phone,
            nivel: nivel,
            dia: dia,
            pergunta1: pergunta1,
            pergunta2: pergunta2,
            naoSabe1: naoSabe1,
            naoSabe2: naoSabe2
        }).then((response) => {
            console.log('Sucesso!', response.status, response.text);
            formSubmitted = true; 
            window.onblur = null; 

            
            if (confirm("Formulário enviado com sucesso! Deseja fechar a janela?")) {
                window.close();
            } else {
                form.reset();
            }
        }).catch((error) => {
            console.error('Erro ao enviar', error);
            alert("Houve um erro ao enviar o formulário. Tente novamente mais tarde.");
        });
    });

    (function() {
        emailjs.init("2BR4ZjBjuOxBBtxLu");
        console.log("EmailJS inicializado com sucesso!");
    })();
});
