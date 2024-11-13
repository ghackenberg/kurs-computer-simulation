namespace DynamischWarteschlange.Model
{
    internal class Simulation
    {
        // Generator für Zufallszahlen
        public Random Random { get; }

        // Simulationsuhr definieren
        public double Clock { get; set; } = 0;

        // Simulationszustand definieren
        public State State { get; set; } = new State();

        public List<double> ChartTime = new List<double>();

        public List<bool> ChartBusy = new List<bool>();

        public List<int> ChartLength = new List<int>();

        // Ereigniswarteschlange definieren
        private PriorityQueue<Event, double> Queue { get; } = new PriorityQueue<Event, double>();

        // Simulation mit Zufallszahlengenerator erzeugen
        public Simulation(Random random)
        {
            Random = random;
        }

        // Methode zum Hinzufügen von Ereignissen
        public void Add(Event e)
        {
            Queue.Enqueue(e, e.Timestamp);
        }

        // Durchführung der Simulationsschleife
        public void Run()
        {
            // Chart-Daten initialisieren
            ChartTime.Add(Clock);
            ChartBusy.Add(State.Busy);
            ChartLength.Add(State.Length);

            // Solange rechnen, bis alle Ereignisse abgearbeitet sind
            while (Queue.Count > 0)
            {
                // Nächstes Ereignis aus der Warteschlange nehmen
                Event next = Queue.Dequeue();

                // Uhrzeit vorstellen auf den Zeitpunkt des Ereignisses
                Clock = next.Timestamp;

                // Ankunftsereignisse erkennen und verarbeiten
                if (next is ArrivalEvent)
                {
                    if (State.Busy)
                    {
                        State.Length++;
                    }
                    else
                    {
                        State.Busy = true;

                        var serviceTime = Random.NextDouble() * 5 * 60;

                        Add(new DepartureEvent(Clock + serviceTime));
                    }
                }
                // Abfahrtsereignisse erkennen und verarbeiten
                else if (next is DepartureEvent)
                {
                    if (State.Length == 0)
                    {
                        State.Busy = false;
                    }
                    else
                    {
                        State.Length--;

                        var serviceTime = Random.NextDouble() * 5 * 60;

                        Add(new DepartureEvent(Clock + serviceTime));
                    }
                }
                // Andere Ereignistypen erkennen und verarbeiten
                else
                {
                    throw new Exception("Unsupported event type!");
                }

                // Chart-Daten aktualisieren
                if (ChartTime.Last() == Clock)
                {
                    ChartBusy[ChartBusy.Count - 1] = State.Busy;
                    ChartLength[ChartLength.Count - 1] = State.Length;
                }
                else
                {
                    ChartTime.Add(Clock);
                    ChartBusy.Add(State.Busy);
                    ChartLength.Add(State.Length);
                }
            }
        }
    }
}
