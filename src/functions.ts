export function getScreenColor(screen: string, opacity: string): string {
  let color: string = ''
  switch (screen) {
    case 'home':
        color = `rgba(92,41,41,${opacity})`
        break;
    case 'GF':
        color = `rgba(147,147,147,${opacity})`
        break;
    case 'auchan':
        color = `rgba(28,42,58,${opacity})`
        break;
    case 'others':
        color = `rgba(225,157,94,${opacity})`
        break;
    }
  return color
}