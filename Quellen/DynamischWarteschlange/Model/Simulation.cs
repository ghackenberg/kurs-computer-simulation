namespace DynamischWarteschlange.Model
{
    internal class Simulation
    {
        private PriorityQueue<Event, double> queue = new PriorityQueue<Event, double>();

        public void Add(Event e)
        {
            queue.Enqueue(e, e.Timestamp);
        }

        private double clock = 0;

        private bool busy = false;

        private int length = 0;

        public void Run()
        {
            while (queue.Count > 0)
            {
                Event next = queue.Dequeue();

                clock = next.Timestamp;

                if (next is ArrivalEvent)
                {
                    if (busy)
                    {
                        length++;
                    }
                    else
                    {
                        busy = true;

                        var serviceTime = 5 * 60;

                        Add(new DepartureEvent(clock + serviceTime));
                    }
                }
                else if (next is DepartureEvent)
                {
                    if (length == 0)
                    {
                        busy = false;
                    }
                    else
                    {
                        length--;

                        var serviceTime = 5 * 60;

                        Add(new DepartureEvent(clock + serviceTime));
                    }
                } 
                else
                {
                    throw new Exception("Unsupported event type!");
                }
            }
        }
    }
}
