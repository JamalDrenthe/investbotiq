import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				investbotiq: {
					primary: '#635bff',
					secondary: '#22d3ee',
					accent: '#9470d9',
					light: '#EEF2FF',
					dark: '#0b1020'
				},
				// DESIGN.md tokens
				canvas: {
					DEFAULT: '#05070f',
					elevated: '#0b1020',
					panel: '#111832',
					hairline: 'rgba(148, 163, 255, 0.14)'
				},
				paper: {
					DEFAULT: '#f6f7fb',
					elevated: '#ffffff',
					hairline: '#e3e6f2'
				},
				indigo: {
					DEFAULT: '#635bff',
					deep: '#2f00ab',
					night: '#0d0029',
					50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8',
					500: '#635bff', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b'
				},
				cyan: { DEFAULT: '#22d3ee', 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344' },
				mint: '#34d399',
				amber: { DEFAULT: '#fbbf24', 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03' },
				rose: '#fb7185',
				ink: {
					DEFAULT: '#f5f7ff',
					muted: '#a4adcf',
					faint: '#5f6a94'
				},
				graphite: {
					DEFAULT: '#0b1020',
					muted: '#525b7a',
					faint: '#8b93b2'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'ds-sm': '8px',
				'ds-md': '14px',
				'ds-lg': '20px',
				'ds-xl': '28px'
			},
			fontSize: {
				'display-xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.035em', fontWeight: '600' }],
				'display-lg': ['3.5rem', { lineHeight: '1.04', letterSpacing: '-0.03em', fontWeight: '600' }],
				'display-md': ['2.5rem', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '600' }],
				heading: ['1.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
				subheading: ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
				eyebrow: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.18em', fontWeight: '600' }]
			},
			boxShadow: {
				'level-3': '0 24px 80px rgba(5, 7, 15, 0.6)',
				glow: '0 0 120px rgba(99, 91, 255, 0.35)',
				lumen: '0 4px 22px rgba(70, 20, 190, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.14)'
			},
			maxWidth: {
				content: '1200px',
				prose: '44rem'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'pulse-dot': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.4', transform: 'scale(0.7)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'pulse-dot': 'pulse-dot 2.4s ease-in-out infinite'
			},
			fontFamily: {
				sans: ['DM Sans', 'system-ui', 'sans-serif'],
				display: ['Space Grotesk', 'Sora', 'Manrope', 'system-ui', 'sans-serif'],
				playfair: ['Space Grotesk', 'sans-serif'],
			}
		}
	},
	plugins: [tailwindAnimate],
} satisfies Config;
