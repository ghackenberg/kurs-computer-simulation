namespace DynamischWarteschlange.Model
{
    internal abstract class Event
    {
        public double Timestamp { get; set; }

        public Event(double timestamp)
        {
            Timestamp = timestamp;
        }
    }
    internal class ArrivalEvent : Event
    {
        public ArrivalEvent(double timestamp) : base(timestamp)
        {

        }
    }
    internal class DepartureEvent : Event
    {
        public DepartureEvent(double timestamp) : base(timestamp)
        {

        }
    }
}
