namespace DynamischWarteschlange.Model
{
    // Zustand des Systems zu einem gegebenen Zeitpunkt
    internal class State
    {
        // Belegung der Kasse bzw. der Maschine
        public bool Busy { get; set; } = false;

        // Länge der Warteschlange vor der Kasse bzw. der Maschine
        public int Length { get; set; } = 0;
    }
}
