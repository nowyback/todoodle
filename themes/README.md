# Custom Themes

Place theme files in this folder to create custom visual styles for Todoodle.

## Available Themes

### Dark Matter Theme (`dark-matter.theme.css`)
- Cold, dark & frosty aesthetic
- Blue accent colors (#25ace8)
- Dark backgrounds with subtle highlights

### Fallout 4 Terminal Theme (`fallout-terminal.theme.css`)
- Green phosphor terminal aesthetic
- Monospace font with CRT scanline effect
- Retro computer terminal feel
- Flickering text animation

### Translucent Theme (`translucent.theme.css`)
- Modern glass morphism design
- Heavy blur effects and transparency
- Frosted glass containers
- Smooth hover animations

## How to Use Themes

1. **Copy theme files** to this folder
2. **Restart Todoodle** to load themes
3. **Select theme** in settings (coming soon)

## Creating Your Own Theme

Create a new `.theme.css` file with custom CSS variables:

```css
:root {
  --primary-color: #your-color;
  --background: #your-bg;
  --background-rgb: r, g, b;
  --text-primary: #your-text;
  /* ... more variables */
}
```

## Theme Variables

- `--primary-color`: Main accent color
- `--background`: Main background color
- `--text-primary`: Primary text color
- `--surface`: Card/container backgrounds
- `--border`: Border colors
- `--shadow`: Drop shadow colors

## Tips

- Use `--background-rgb` for opacity effects
- Test with both dark and light modes
- Ensure good contrast for readability
- Add hover effects for better UX
