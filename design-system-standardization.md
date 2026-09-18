# Project Plan: Design System & Color Palette Standardization

Standardization of MedFlow frontend design system, adopting a unified mixed color palette (Jet Black, Pale Sky, Hunter Green, Lime Cream, Lavender, Fern), responsive modular grid layout, and consistent styling across Header, Hero, Services, Footer, Listing pages (lighter background variant), Details pages, and Form/Update pages.

## Project Type
**WEB** (React 19 + TypeScript + Vite + PrimeReact/CSS Modules/Vanilla CSS)

## Success Criteria
1. **Unified Color Token System**:
   - `Jet Black (#022B3A)`: Dark mode primary background & footer background.
   - `Pale Sky (#BFDBF7)`: Secondary section background & text on dark mode.
   - `Hunter Green (#31572C)`: Secondary section background & primary text on light mode.
   - `Lime Cream (#ECF39E)`: Primary CTA buttons, links active states, highlight accents.
   - `Lavender (#E1E5F2)`: Soft accent, focus borders, secondary icons/tags.
   - `Fern (#4F772D)`: Soft accent, eyebrow labels, status badges.
2. **Component Standardization**:
   - **Header**: White text navigation with Lime Cream active/hover highlights.
   - **Hero**: Clear title & subtitle hierarchy with Lime Cream CTA button.
   - **Services/Cards**: Alternating card backgrounds (`#BFDBF7` & `#31572C`) with "Saiba Mais" Lime Cream buttons.
   - **Footer**: `#022B3A` background with `#BFDBF7` links and `#4F772D` icons.
   - **Listings**: Standardized lighter background tone (`--surface-listing`) across all 3 listing pages (`ListagemPaciente`, `ListagemMedico`, `ListagemConsulta`).
   - **Consistency Across Listing, Detail & Update Pages**: Identical card structures, typography, inputs, buttons, and spacing.
3. **Accessibility & Dark/Light Mode**:
   - Smooth transition between Light & Dark themes.
   - High contrast text (`White` on dark, `Hunter Green` on light).

## Design System Tokens (`src/index.css`)
```css
:root {
  /* Color Palette */
  --jet-black: #022B3A;
  --pale-sky: #BFDBF7;
  --hunter-green: #31572C;
  --lime-cream: #ECF39E;
  --lavender: #E1E5F2;
  --fern: #4F772D;
  --white: #FFFFFF;

  /* Theme Tokens - Light Mode */
  --surface: #F7FBFF;
  --surface-listing: #EFF6FC; /* Slightly lighter tone for listing pages */
  --surface-card-1: var(--pale-sky);
  --surface-card-2: var(--hunter-green);
  --surface-raised: #FFFFFF;
  --surface-muted: var(--lavender);
  
  --text-primary: var(--hunter-green);
  --text-secondary: #4A635D;
  --text-on-dark: var(--white);
  --text-dark-muted: var(--pale-sky);

  --accent-cta: var(--lime-cream);
  --accent-border: var(--lavender);
  --accent-secondary: var(--fern);

  /* Shadows & Radius */
  --radius-sm: 0.75rem;
  --radius-md: 1.25rem;
  --radius-lg: 1.75rem;
  --shadow-sm: 0 8px 20px rgba(2, 43, 58, 0.08);
  --shadow-lg: 0 22px 50px rgba(2, 43, 58, 0.16);
}

[data-theme='dark'] {
  /* Theme Tokens - Dark Mode */
  --surface: var(--jet-black);
  --surface-listing: #053344; /* Slightly lighter dark tone for listing pages */
  --surface-card-1: #0A4356;
  --surface-card-2: var(--hunter-green);
  --surface-raised: #083D4E;
  --surface-muted: #0B4658;

  --text-primary: var(--white);
  --text-secondary: var(--pale-sky);
  
  --accent-border: rgba(225, 229, 242, 0.3);
}
```

## Tech Stack
- React 19 + Vite + TypeScript
- CSS Variables / Vanilla CSS + CSS Modules
- PrimeReact + PrimeIcons

## File Structure & Affected Components
- [MODIFY] `src/index.css`: Global design tokens, typography, button classes, utility styles.
- [MODIFY] `src/components/Navegacao/Navegacao.tsx` & `Navegacao.css`: Header menu, text in White, Lime Cream active states.
- [MODIFY] `src/pages/PHome/PHome.tsx` & CSS: Hero title/subtitle, Lime Cream CTA button.
- [MODIFY] `src/components/CardsServicos/`: Services/Features cards with alternating Pale Sky & Hunter Green backgrounds and Lime Cream "Saiba Mais" buttons.
- [MODIFY] `src/components/Rodape/Rodape.tsx` & CSS: Dark background (`Jet Black`), Pale Sky links, Fern icons.
- [MODIFY] `src/styles/ListagensPadrao.css`: Common table/card listing layout with lighter surface background tone.
- [MODIFY] `src/styles/DetalhesPadrao.module.css`: Shared detail and update form styling.
- [MODIFY] `src/components/Listagens/ListagemPaciente/ListagemPaciente.tsx`
- [MODIFY] `src/components/Listagens/ListagemMedico/ListagemMedico.tsx`
- [MODIFY] `src/components/Listagens/ListagemConsulta/ListagemConsulta.tsx`
- [MODIFY] `src/pages/PDetalhes/PDetalhesPaciente/PDetalhesPaciente.tsx`
- [MODIFY] `src/pages/PDetalhes/PDetalhesMedico/PDetalhesMedico.tsx`
- [MODIFY] `src/pages/PDetalhes/PDetalhesConsulta/PDetalhesConsulta.tsx`
- [MODIFY] `src/pages/PAtualizar/PAtualizarPaciente/PAtualizarPaciente.tsx`
- [MODIFY] `src/pages/PAtualizar/PAtualizarMedico/PAtualizarMedico.tsx`
- [MODIFY] `src/pages/PAtualizar/PAtualizarConsulta/PAtualizarConsulta.tsx`

## Task Breakdown

### Task 1: Update Global Design Tokens & Typography (`src/index.css`)
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`, `design-spec`
- **Priority**: P0
- **Dependencies**: None
- **INPUT**: Palette specification from prompt.
- **OUTPUT**: Complete token definitions in `src/index.css` supporting both Light and Dark modes, buttons, typography, card utilities.
- **VERIFY**: Check CSS variable values and hover states.

### Task 2: Standardize Header Navigation (`src/components/Navegacao`)
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Priority**: P1
- **Dependencies**: Task 1
- **INPUT**: `Navegacao.tsx` and `Navegacao.css`.
- **OUTPUT**: Header menu styling with White text, Lime Cream highlights on active/hover, theme toggle button, and Glassmorphic background.
- **VERIFY**: Verify menu items color and Lime Cream focus/active indicators.

### Task 3: Standardize Hero & Services Sections (`src/pages/PHome` & `src/components/CardsServicos`)
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Priority**: P1
- **Dependencies**: Task 1
- **INPUT**: `PHome.tsx` and `CardsServicos`.
- **OUTPUT**: Hero section with bold title/subtitle and Lime Cream CTA button. Feature cards with alternating Pale Sky (`#BFDBF7`) and Hunter Green (`#31572C`) backgrounds and Lime Cream "Saiba Mais" buttons.
- **VERIFY**: Inspect card background contrast and button colors.

### Task 4: Standardize Footer Component (`src/components/Rodape`)
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Priority**: P1
- **Dependencies**: Task 1
- **INPUT**: `Rodape.tsx` and CSS.
- **OUTPUT**: Dark background (`#022B3A`), `#BFDBF7` links, and `#4F772D` secondary icons/accents.
- **VERIFY**: Check contrast in both Light and Dark mode.

### Task 5: Standardize Listing Pages (`ListagensPadrao.css` & 3 Listing Components)
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Priority**: P1
- **Dependencies**: Task 1
- **INPUT**: `ListagensPadrao.css`, `ListagemPaciente`, `ListagemMedico`, `ListagemConsulta`.
- **OUTPUT**: Unified layout with a slightly lighter background tone (`--surface-listing`), standardized headers, search bars, action buttons, table rows, and badges across all 3 pages.
- **VERIFY**: Verify consistent visual structure on `/lista/paciente`, `/lista/medico`, `/lista/consulta`.

### Task 6: Standardize Detail & Update/Form Pages (`DetalhesPadrao.module.css` & Detail/Update Pages)
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Priority**: P1
- **Dependencies**: Task 1, Task 5
- **INPUT**: `DetalhesPadrao.module.css`, `PDetalhes...`, `PAtualizar...`, `PCadastro...`.
- **OUTPUT**: Unified detail cards, form inputs, status tags (Fern / Lavender), and action buttons (Lime Cream primary, Lavender secondary).
- **VERIFY**: Test navigation between listing -> details -> update pages for visual continuity.

## Phase X: Final Verification
- [ ] `npm run build`: Verify TypeScript compilation and Vite build with 0 errors.
- [ ] Theme toggle verification: Test switching between Light & Dark mode.
- [ ] Color contrast verification: Ensure white text on dark and Hunter Green text on light meet WCAG guidelines.
- [ ] Listing & detail page parity check across Paciente, Medico, and Consulta modules.
