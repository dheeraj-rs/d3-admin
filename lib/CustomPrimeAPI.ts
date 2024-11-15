class CustomPrimeAPI {
    private static instance: CustomPrimeAPI;
    private _ripple: boolean = false;
    private _theme: string = 'lara-light-indigo';

    private constructor() {}

    public static getInstance(): CustomPrimeAPI {
        if (!CustomPrimeAPI.instance) {
            CustomPrimeAPI.instance = new CustomPrimeAPI();
        }
        return CustomPrimeAPI.instance;
    }

    get ripple(): boolean {
        return this._ripple;
    }

    set ripple(value: boolean) {
        this._ripple = value;
        this.handleRippleEffect(value);
    }

    private handleRippleEffect(value: boolean): void {
        if (value) {
            document.addEventListener('click', this.createRipple);
        } else {
            document.removeEventListener('click', this.createRipple);
        }
    }

    private createRipple = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const rippleElement = target.closest('.p-ripple') as HTMLElement;

        if (rippleElement) {
            const rect = rippleElement.getBoundingClientRect();
            const diameter = Math.max(rippleElement.clientWidth, rippleElement.clientHeight);
            const radius = diameter / 2;

            const ink = document.createElement('span');
            ink.className = 'p-ink';
            ink.style.width = ink.style.height = `${diameter}px`;
            ink.style.left = `${event.clientX - rect.left - radius}px`;
            ink.style.top = `${event.clientY - rect.top - radius}px`;

            const existingInk = rippleElement.querySelector('.p-ink');
            if (existingInk) {
                existingInk.remove();
            }

            rippleElement.appendChild(ink);

            setTimeout(() => {
                ink.classList.add('p-ink-active');
            }, 1);

            ink.addEventListener('animationend', () => {
                ink.remove();
            });
        }
    };

    public changeTheme(currentTheme: string, newTheme: string, linkElementId: string, callback?: () => void): void {
        const linkElement = document.getElementById(linkElementId) as HTMLLinkElement;
        if (linkElement) {
            linkElement.setAttribute('href', `/themes/${newTheme}/theme.css`);
            this._theme = newTheme;
            if (callback) {
                callback();
            }
        }
    }
}

const CustomPrime = CustomPrimeAPI.getInstance();
export default CustomPrime;
