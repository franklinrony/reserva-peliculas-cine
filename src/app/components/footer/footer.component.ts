import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>CineReserva</h3>
            <p>Tu plataforma de reservas de tickets para cine con la mejor experiencia.</p>
          </div>
          <div class="footer-section">
            <h3>Enlaces rápidos</h3>
            <ul>
              <li><a href="#">Cartelera</a></li>
              <li><a href="#">Próximos estrenos</a></li>
              <li><a href="#">Promociones</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Contacto</h3>
            <p>contacto&#64;cinereserva.com</p>
            <p>+34 91 123 45 67</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 CineReserva. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {}