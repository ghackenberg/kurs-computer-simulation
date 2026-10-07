---
marp: true
theme: fhooe
header: 'Kapitel 2: 2D-Visualisierung (WPF/Pixel)'
footer: 'Dr. Georg Hackenberg, Professor für Informatik und Industriesysteme'
paginate: true
math: mathjax
---

# Kapitel 2: 2D-Visualisierung (WPF/Pixel)

Dieses Kapitel umfasst die folgenden Abschnitte:

- 2.1: Grundlagen digitaler Rasterbilder
- 2.2: Pixel-Rendering in WPF mit WriteableBitmap
- 2.3: Direkte Speicher-Manipulation & Performance
- 2.4: Anwendungsfall: Farbskalen & Heatmaps

---

## 2.1: Grundlagen digitaler Rasterbilder

Dieser Abschnitt umfasst die folgenden Inhalte:

- Prinzip der Rastergrafik (Pixel, Matrixstruktur)
- Farbmodelle und Farbtiefe (RGB, ARGB, 32-Bit)
- Speicherlayout im RAM: Stride, Bytereihenfolge und Adressierung

---

### Was ist ein Rasterbild?

- Ein digitales Bild ist eine zweidimensionale Matrix aus diskreten Bildpunkten (**Pixel**).
- Jedes Pixel besitzt diskrete Koordinaten $(x, y)$ mit $0 \le x < \text{Breite}$ und $0 \le y < \text{Höhe}$.
- Der Zustand eines Pixels wird durch einen oder mehrere Farbwerte repräsentiert.
- **Einsatzbereiche in der Simulation:**
  - 2D-Feldsimulationen (z.B. Temperatur- oder Druckverteilung, Strömungsfelder)
  - Zelluläre Automaten (z.B. Conway's Game of Life, Partikelsedimentation)
  - Diffusions- und Wellengleichungen auf Gittern (Finite Differenzen)

---

### Farbmodelle und Farbtiefe

In modernen GUI-Frameworks und Grafikkarten ist das **32-Bit ARGB / BGRA-Format** der Standard:

- **A (Alpha)**: Transparenzkanal ($0 = \text{voll transparent}, 255 = \text{voll deckend}$)
- **R (Rot)**, **G (Grün)**, **B (Blau)**: Farbkomponenten jeweils $0 \dots 255$ (1 Byte je Kanal).
- Pro Pixel werden exakt 4 Bytes ($32 \text{ Bits}$) im Speicher belegt.
- Typische Bytereihenfolge in Windows / WPF (`PixelFormats.Bgra32`):
  `[Byte 0: Blue, Byte 1: Green, Byte 2: Red, Byte 3: Alpha]`.

---

### Speicherlayout im Arbeitsspeicher (RAM)

Ein 2D-Rasterbild wird im Speicher als **kontinuierliches 1D-Byte-Array** abgelegt:

- Die Bildzeilen liegen sequentiell hintereinander.
- **`Stride`**: Die Anzahl der Bytes, die eine Bildzeile im Speicher belegt.
  $\text{Stride} = \text{Breite} \times \text{BytesJePixel}$ (ggf. auf 4-Byte-Grenzen aufgerundet).
- Der lineare Offset im Speicher für ein Pixel an Koordinate $(x, y)$ berechnet sich zu:
  $$\text{Offset}(x, y) = y \cdot \text{Stride} + x \cdot \text{BytesJePixel}$$

---

## 2.2: Pixel-Rendering in WPF mit WriteableBitmap

Dieser Abschnitt umfasst die folgenden Inhalte:

- Grenzen herkömmlicher WPF-Elemente bei Massendaten
- Die Klasse `WriteableBitmap`
- Einbindung in die WPF-Oberfläche (`Image`-Control)

---

### Warum reicht ein normales WPF-Control nicht aus?

- Jedes UI-Element (wie ein `Rectangle` oder `Ellipse` auf einem `Canvas`) ist ein vollwertiges WPF-Objekt im Visual Tree.
- Bei $100 \times 100 = 10.000$ Elementen bricht die Framerate ein; bei $1000 \times 1000 = 1.000.000$ Punkten stürzt die UI ab.
- **Lösung:** Wir verwalten ein einziges Bild (**`WriteableBitmap`**), rendern die Pixel direkt in den Speicher und weisen es einem einzelnen WPF `Image`-Element zu.

---

### Initialisierung einer `WriteableBitmap`

```csharp
using System.Windows.Media;
using System.Windows.Media.Imaging;

int width = 800;
int height = 600;
double dpiX = 96.0;
double dpiY = 96.0;

// Erzeuge eine beschreibbare Bitmap im 32-Bit BGRA-Format
var bitmap = new WriteableBitmap(
    width, 
    height, 
    dpiX, 
    dpiY, 
    PixelFormats.Bgra32, 
    null
);

// Dem Image-Control in XAML zuweisen
myImageControl.Source = bitmap;
```

---

## 2.3: Direkte Speicher-Manipulation & Performance

Dieser Abschnitt umfasst die folgenden Inhalte:

- Der Aktualisierungs-Zyklus: `Lock()`, Modifikation, `AddDirtyRect()`, `Unlock()`
- Sicherer Zugriff vs. Hochleistungszugriff mit C#-Zeigern (`unsafe`)
- Performance-Vergleich

---

### Der Aktualisierungs-Zyklus

Um Thread-Konflikte mit dem WPF-Render-Thread zu vermeiden, muss der Back-Buffer gesperrt werden:

```csharp
// 1. Buffer sperren
bitmap.Lock();

try
{
    // 2. Speicheradresse des Back-Buffers holen
    IntPtr pBackBuffer = bitmap.BackBuffer;
    int stride = bitmap.BackBufferStride;

    // ... Pixel modifizieren ...

    // 3. Den geänderten Bildbereich als 'ungültig' markieren
    bitmap.AddDirtyRect(new Int32Rect(0, 0, bitmap.PixelWidth, bitmap.PixelHeight));
}
finally
{
    // 4. Buffer entsperren (WPF zeichnet das Bild neu)
    bitmap.Unlock();
}
```

---

### Hochleistungs-Schreiben mit C#-Pointern (`unsafe`)

```csharp
unsafe
{
    byte* pBuffer = (byte*)bitmap.BackBuffer.ToPointer();

    for (int y = 0; y < height; y++)
    {
        for (int x = 0; x < width; x++)
        {
            int offset = y * stride + x * 4;

            // BGRA: Blau, Grün, Rot, Alpha
            pBuffer[offset + 0] = 0;   // Blue
            pBuffer[offset + 1] = 128; // Green
            pBuffer[offset + 2] = 255; // Red
            pBuffer[offset + 3] = 255; // Alpha (voll deckend)
        }
    }
}
```

---

## 2.4: Anwendungsfall: Farbskalen & Heatmaps

Dieser Abschnitt umfasst die folgenden Inhalte:

- Abbildung physikalischer Werte auf Farben
- Lineare Farbinterpolation und Colormaps
- Beispiel: 2D-Temperaturfeld

---

### Colormaps: Von Skalaren zu Farben

In der Simulation repräsentiert ein Pixel oft eine kontinuierliche physikalische Größe $T \in [T_{\min}, T_{\max}]$ (z.B. Temperatur, Druck).

1. **Normierung auf $[0, 1]$:**
   $$v = \frac{T - T_{\min}}{T_{\max} - T_{\min}}$$
2. **Farbinterpolation (z.B. Blau $\to$ Grün $\to$ Rot):**
   - $v = 0.0$: Kalt (Blau: $R=0, G=0, B=255$)
   - $v = 0.5$: Mittel (Grün: $R=0, G=255, B=0$)
   - $v = 1.0$: Heiß (Rot: $R=255, G=0, B=0$)

---

### Implementierung einer einfachen Farbskala

```csharp
public static (byte B, byte G, byte R) GetHeatmapColor(double value)
{
    // value im Bereich [0.0, 1.0]
    value = Math.Clamp(value, 0.0, 1.0);

    byte r = (byte)(255 * value);
    byte b = (byte)(255 * (1.0 - value));
    byte g = (byte)(128 * (1.0 - Math.Abs(value - 0.5) * 2));

    return (b, g, r);
}
```

---

# Zusammenfassung Kapitel 2

- **Rastergrafiken** bestehen aus einer 2D-Matrix diskreter Pixel, die im RAM als 1D-Bytefolge mit definierter Farbtiefe und `Stride` organisiert sind.
- In WPF ermöglicht **`WriteableBitmap`** das performante Rendern von Millionen Bildpunkten unter Umgehung des Visual-Tree-Overheads.
- Der **Lock-Unlock-Zyklus** stellt die threadsichere Koordination mit dem WPF-Render-Thread sicher; `AddDirtyRect` minimiert den Renderaufwand auf veränderte Bereiche.
- Über **Farbverläufe (Colormaps)** lassen sich kontinuierliche Simulationsdaten (z.B. Temperatur-, Dichte- oder Spannungsfelder) intuitiv visualisieren.
