(() => {
	const initializeLogin = () => {
		const form = document.querySelector('#loginForm');
		if (!form) return;

		const emailInput = form.querySelector('[name="email"]');
		const passwordInput = form.querySelector('[name="password"]');
		const submitButton = form.querySelector('[type="submit"]');
		let message = form.querySelector('[data-login-message]');

		if (!message) {
			message = document.createElement('p');
			message.dataset.loginMessage = '';
			message.setAttribute('role', 'alert');
			message.setAttribute('aria-live', 'polite');
			form.append(message);
		}

		const showMessage = (text, isError = true) => {
			message.textContent = text;
			message.dataset.state = isError ? 'error' : 'success';
		};

		form.querySelectorAll('[data-toggle-password]').forEach((toggle) => {
			toggle.addEventListener('click', () => {
				const target = toggle.dataset.togglePassword;
				const input = target
					? document.querySelector(target)
					: passwordInput;

				if (!input) return;

				const isVisible = input.type === 'text';
				input.type = isVisible ? 'password' : 'text';
				toggle.setAttribute('aria-pressed', String(!isVisible));
				toggle.setAttribute('aria-label', isVisible ? 'Mostrar senha' : 'Ocultar senha');
			});
		});

		form.addEventListener('submit', async (event) => {
			event.preventDefault();
			message.textContent = '';

			if (!emailInput || !passwordInput || !form.reportValidity()) return;

			const originalButtonText = submitButton?.textContent;
			if (submitButton) {
				submitButton.disabled = true;
				submitButton.textContent = 'Entrando...';
			}

			try {
				const response = await fetch(form.dataset.loginUrl || '/api/login', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'same-origin',
					body: JSON.stringify({
						email: emailInput.value.trim(),
						password: passwordInput.value,
					}),
				});

				const result = await response.json().catch(() => ({}));
				if (!response.ok) {
					throw new Error(result.message || 'E-mail ou senha inválidos.');
				}

				showMessage('Login realizado com sucesso.', false);
				alert('Login realizado com sucesso !');
				const redirectUrl = result.redirectUrl || form.dataset.redirectUrl || '/';
				window.location.assign(redirectUrl);
			} catch (error) {
				showMessage(error.message || 'Não foi possível entrar. Tente novamente.');
			} finally {
				if (submitButton) {
					submitButton.disabled = false;
					submitButton.textContent = originalButtonText;
				}
			}
		});
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initializeLogin, { once: true });
	} else {
		initializeLogin();
	}
})();
