namespace DynamischWarteschlange.Model
{
    // Basisklasse für alle Arten von Ereignissen
    internal abstract class Event
    {
        public double Timestamp { get; set; }

        public Event(double timestamp)
        {
            Timestamp = timestamp;
        }
    }

    // Ankunft eines Kunden an der Kasse/eines Jobs an der Maschine
    internal class ArrivalEvent : Event
    {
        public ArrivalEvent(double timestamp) : base(timestamp)
        {

        }
    }

    // Abfahrt eines Kunden von der Kasse/eines Jobs von der Maschine
    internal class DepartureEvent : Event
    {
        public DepartureEvent(double timestamp) : base(timestamp)
        {

        }
    }
}
