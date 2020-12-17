import { loadAuthModule } from 'src/services/auth/authService'

// Load auth module when browser window loads. Only required for redirect flows.
void loadAuthModule()