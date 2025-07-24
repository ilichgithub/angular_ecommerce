import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { ReactiveFormsModule } from '@angular/forms'; // Necesario para formularios reactivos
import {
  TranslateModule,
  TranslateService,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // A veces necesario para componentes con animaciones o que dependen de ellos
import { BehaviorSubject, of } from 'rxjs'; // Para crear observables mockeados
import * as AuthSelectors from '../../state/auth/auth.selectors';
import * as AuthActions from '../../state/auth/auth.actions'; 
import { By } from '@angular/platform-browser';

// Creamos BehaviorSubjects para los selectores que el componente suscribe
const mockAuthLoadingSubject = new BehaviorSubject<boolean>(false); // Inicia en false
const mockIsLoggedInSubject = new BehaviorSubject<boolean>(false);  // Inicia en false
const mockAuthErrorSubject = new BehaviorSubject<string | null>(null); // Inicia en null

// Mock del Store de NgRx
// Usaremos un objeto simple con 'dispatch' y 'select' como spies
// 'select' devolverá un observable de 'of()' para simular los selectores.
const mockStore = {
  dispatch: jasmine.createSpy('dispatch'),
  select: jasmine.createSpy('select').and.returnValue(of(false)), // Por defecto, selectAuthLoading y selectIsLoggedIn serán false.
  // Puedes ajustar este valor de retorno por defecto o en cada test.
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, // Componente standalone
        ReactiveFormsModule, // Para [formGroup] y formControlName
        BrowserAnimationsModule, // A veces ayuda a evitar errores con ciertas animaciones o módulos
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }, // Loader falso para traducciones
        }),
      ],
      providers: [
        // Proveemos nuestro mockStore en lugar del Store real de NgRx
        { provide: Store, useValue: mockStore },
        TranslateService // Necesario para que el pipe translate funcione en los tests
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    console.log("LoginComponent beforeEach");
    // Resetear los spies antes de cada test para evitar interferencias
    mockStore.dispatch.calls.reset();
    mockStore.select.calls.reset(); // Reiniciar también el spy de select
    mockAuthLoadingSubject.next(false);// Resetear a su valor inicial para cada test
    mockIsLoggedInSubject.next(false);
    mockAuthErrorSubject.next(null);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);

    // Configurar idioma para traducciones en tests
    translateService.setDefaultLang('en');
    translateService.use('en');

    // Mocks ESPECÍFICOS para CADA selector que el componente usa
    mockStore.select
      .withArgs(AuthSelectors.selectAuthLoading)
      .and.returnValue(mockAuthLoadingSubject.asObservable());
    mockStore.select
      .withArgs(AuthSelectors.selectIsLoggedIn)
      .and.returnValue(mockIsLoggedInSubject.asObservable());
    mockStore.select
      .withArgs(AuthSelectors.selectAuthError)
      .and.returnValue(mockAuthErrorSubject.asObservable());

    // Detectar cambios iniciales para que el componente se renderice
    // y los observables iniciales del Store se procesen.
    fixture.detectChanges();
  });
  // --- Test 1: Comprobación de Creación del Componente ---
  it('should create the component', () => {
    console.log("LoginComponent Test 1");
    expect(component).toBeTruthy();
      console.log("LoginComponent Test 1 F");
  });

  // --- Test 2: Inicialización del Formulario Reactivo ---
  it('should initialize the credentialForm with username and password controls', () => {
    console.log("LoginComponent Test 2");
    expect(component.credentialForm).toBeDefined();
    expect(component.credentialForm.get('username')).toBeDefined();
    expect(component.credentialForm.get('password')).toBeDefined();
      console.log("LoginComponent Test 2 F");
  });

  // --- Test 3: Valores Iniciales de las Propiedades ---
  it('should initialize isLoading to false and isCreate to false', () => {
    console.log("LoginComponent Test 3");
    expect(component.isLoading).toBeFalse();
    expect(component.isCreate).toBeFalse();
      console.log("LoginComponent Test 3 F");
  });

  // --- Test 4: Verificación de Suscripciones al Store (indirecta) ---
  it('should select data from the NgRx store on initialization', () => {
    console.log("LoginComponent Test 4");
    // Verificamos que 'select' del mockStore fue llamado para los selectores que el componente consume
    // No podemos verificar directamente el objeto selector si no lo exportas,
    // pero podemos verificar que 'select' fue llamado al menos 3 veces (por loading, isLoggedIn$, authError$)
    expect(mockStore.select).toHaveBeenCalledTimes(3);
    // Para ser más específicos, podrías verificar los argumentos si exportas tus selectores
    // expect(mockStore.select).toHaveBeenCalledWith(AuthSelectors.selectAuthLoading);
    // expect(mockStore.select).toHaveBeenCalledWith(AuthSelectors.selectIsLoggedIn);
    // expect(mockStore.select).toHaveBeenCalledWith(AuthSelectors.selectAuthError);
      console.log("LoginComponent Test 4 F");
  });

  // --- Test 5: Renderizado del Título (por defecto en modo Login) ---
  it('should display the translated welcome title', () => {
    console.log("LoginComponent Test 5");
    const titleElement: HTMLElement = fixture.nativeElement.querySelector('h2');

    expect(titleElement.textContent).toContain('WELCOME');
      console.log("LoginComponent Test 5 F");
  });

  // --- Test 6: Renderizado de los Inputs y Labels (por defecto en modo Login) ---
  it('should display username and password inputs with their labels', () => {
    console.log("LoginComponent Test 6");
    const compiled = fixture.nativeElement;
    const usernameInput: HTMLInputElement = compiled.querySelector('#username');
    const passwordInput: HTMLInputElement = compiled.querySelector('#password');
    const usernameLabel: HTMLLabelElement = compiled.querySelector(
      'label[for="username"]',
    );
    const passwordLabel: HTMLLabelElement = compiled.querySelector(
      'label[for="password"]',
    );

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(usernameLabel.textContent).toContain('PLACEHOLDERS.USER_NAME');
    expect(passwordLabel.textContent).toContain('PLACEHOLDERS.PASSWORD');
      console.log("LoginComponent Test 6 F");
  });


  it('should display the login button text by default', () => {
    console.log("LoginComponent Test 6.1");
    const loginButton: HTMLButtonElement = fixture.debugElement.query(By.css('.login-button')).nativeElement;
    expect(loginButton.textContent).toContain('BUTTONS.LOGIN');
      console.log("LoginComponent Test 6.1 F");
  });

  // Test 7: Actualización de valores del formulario
  it('should update form control values when input changes', () => {
    console.log("LoginComponent Test 7");
    const usernameInput: HTMLInputElement = fixture.debugElement.query(By.css('#username')).nativeElement;
    const passwordInput: HTMLInputElement = fixture.debugElement.query(By.css('#password')).nativeElement;

    // Simular la entrada del usuario
    usernameInput.value = 'testUser';
    passwordInput.value = 'testPass123';

    // Disparar el evento 'input' para que Reactive Forms detecte el cambio
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    // Detectar cambios en el componente para que los bindings se actualicen
    fixture.detectChanges();

    // Verificar que el FormGroup tiene los valores actualizados
    expect(component.credentialForm.get('username')?.value).toBe('testUser');
    expect(component.credentialForm.get('password')?.value).toBe('testPass123');
      console.log("LoginComponent Test 7 F");
  });

  // Test 8: Envío del formulario en modo LOGIN
  it('should dispatch AuthActions.login when login button is clicked', () => {
    console.log("LoginComponent Test 8");
    // 1. Asegurarse de que isLoading es false para que el botón NO esté deshabilitado.
    // Aunque el beforeEach lo configura, es buena práctica reafirmarlo si el test depende de ello.
    mockStore.select.withArgs(AuthSelectors.selectAuthLoading).and.returnValue(of(false));
    fixture.detectChanges(); // Asegurarse de que el botón está habilitado

    // 2. Establecer valores en el formulario reactivo
    component.credentialForm.controls['username'].setValue('user1');
    component.credentialForm.controls['password'].setValue('pass1');
    fixture.detectChanges(); // Asegurar que los valores se han propagado al componente y su estado

    // 3. Obtener el botón de login
    const loginButton = fixture.debugElement.query(By.css('.login-button')).nativeElement;

    // AÑADIR UN SPY EN EL MÉTODO onSubmit PARA DEPURACIÓN
    spyOn(component, 'onSubmit').and.callThrough(); // Esto permite ver si onSubmit fue llamado

    // 4. Simular click en el botón de login
    loginButton.click();

    // 5. Detectar cambios después del click. Esto es crucial.
    fixture.detectChanges();

    // 6. Verificar que onSubmit fue llamado
    expect(component.onSubmit).toHaveBeenCalled(); // <-- Nueva verificación

    // 7. Verificar que la acción AuthActions.login fue despachada con los datos correctos
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      AuthActions.login({ user: { username: 'user1', password: 'pass1' } })
    );
      console.log("LoginComponent Test 8 F");
  });

  // Test 9: Cambio de modo a "Crear Cuenta"
  it('should toggle to create account mode when "Create Account" link button is clicked', () => {
    console.log("LoginComponent Test 9");
    // Verificar que inicialmente estamos en modo login
    expect(component.isCreate).toBeFalse();
    let mainButton = fixture.debugElement.query(By.css('.login-button')).nativeElement;
    expect(mainButton.textContent).toContain('BUTTONS.LOGIN');

    const linkButton = fixture.debugElement.query(By.css('.link-button')).nativeElement;
    expect(linkButton.textContent).toContain('BUTTONS.CREATE_ACCOUNT');
    expect(fixture.nativeElement.querySelector('.create-account-section p').textContent)
      .toContain('LOGIN.NO_ACCOUNT_QUESTION');

    // Click en el botón de enlace
    linkButton.click();
    fixture.detectChanges(); // Actualizar la UI

    // Verificar que el modo ha cambiado
    expect(component.isCreate).toBeTrue();
    // Verificar que los textos de los botones y el párrafo han cambiado
    mainButton = fixture.debugElement.query(By.css('.login-button')).nativeElement; // Recargar el elemento del botón
    expect(mainButton.textContent).toContain('BUTTONS.CREATE_ACCOUNT');
    expect(linkButton.textContent).toContain('BUTTONS.LOGIN'); // El link button ahora dice login
    expect(fixture.nativeElement.querySelector('.create-account-section p').textContent)
      .toContain('LOGIN.ACCOUNT_QUESTION'); // Asegúrate de tener esta clave en tus JSON
      console.log("LoginComponent Test 9 F");
  });

  // Test 10: Envío del formulario en modo CREAR CUENTA
  it('should dispatch AuthActions.create when create account button is clicked', () => {
    console.log("LoginComponent Test 10");
    // Primero, cambiar a modo crear cuenta
    component.notIsCreate();
    fixture.detectChanges();
    expect(component.isCreate).toBeTrue();

    // Establecer valores en el formulario
    component.credentialForm.controls['username'].setValue('newUser');
    component.credentialForm.controls['password'].setValue('newPass');
    fixture.detectChanges();

    // Simular click en el botón principal (ahora es "Crear Cuenta")
    const createAccountButton = fixture.debugElement.query(By.css('.login-button')).nativeElement;
    createAccountButton.click();
    fixture.detectChanges();

    // Verificar que la acción AuthActions.create fue despachada
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      AuthActions.create({ user: { username: 'newUser', password: 'newPass' } })
    );
    console.log("LoginComponent Test 10 F");
  });
  // Test 11: Comportamiento del botón de envío cuando isLoading es true (DESHABILITAR)
  // Ahora lo envolvemos en fakeAsync para usar tick()
  it('should disable the submit button when isLoading is true', async () => { // <-- fakeAsync aquí
    console.log("LoginComponent Test 11");
    // El beforeEach ya ha configurado component.isLoading = false y ha hecho tick()
    expect(component.isLoading).toBeFalse(); // Verificar estado inicial si quieres

    mockAuthLoadingSubject.next(true); // <--- Emitimos true
    fixture.detectChanges();           // <--- Detectamos cambios
    
    await fixture.whenStable(); // Esperar estabilización
    const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('.login-button')).nativeElement;

    expect(component.isLoading).toBeTrue();
    expect(submitButton.disabled).toBeTrue();
    console.log("LoginComponent Test 11 F");
  });
  
  // Test 12: Comportamiento del botón de envío cuando isLoading es false (HABILITAR)
  // Ahora lo envolvemos en fakeAsync para usar tick()
  it('should enable the submit button when isLoading is false', async () => { // <-- fakeAsync aquí
    console.log("LoginComponent Test 12");

    // Primero, configuramos el estado para que el botón esté deshabilitado.
    // El test asume que beforeEach lo dejó en isLoading=false, así que cambiamos a true.
    mockAuthLoadingSubject.next(true);
    fixture.detectChanges();
    await fixture.whenStable(); // Esperar estabilización

    const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('.login-button')).nativeElement;
    // Verificamos que, en este punto, el botón *está* deshabilitado.
    expect(submitButton.disabled).toBeTrue();


    // Ahora, simulamos que la carga terminó y el botón debería habilitarse
    mockAuthLoadingSubject.next(false);
    fixture.detectChanges(); // Forzar la detección de cambios para la habilitación
    await fixture.whenStable(); // Esperar estabilización

    // Verificar que el componente tiene isLoading en false
    expect(component.isLoading).toBeFalse();
    // Verificar que el botón está HABILITADO
    expect(submitButton.disabled).toBeFalse();
    console.log("LoginComponent Test 12 F");
  });
  
});
