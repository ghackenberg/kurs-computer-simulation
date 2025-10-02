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

        // Zeitpunkte für die Chartvisualisierung
        public List<double> ChartTime = new List<double>();
        // Beschäftigungswerte für die Chartvisualisierung
        public List<bool> ChartBusy = new List<bool>();
        // Warteschlangenlängenwerte für die Chartvisualisierung
        public List<int> ChartLength = new List<int>();

        public List<double> WaitTime = new List<double>();

        public List<double> ServiceTime = new List<double>();

        // Ereigniswarteschlange definieren
        private PriorityQueue<Event, double> EventQueue { get; } = new PriorityQueue<Event, double>();

        // Simulation mit Zufallszahlengenerator erzeugen
        public Simulation(Random random)
        {
            Random = random;
        }

        // Methode zum Hinzufügen von Ereignissen
        public void Add(Event e)
        {
            EventQueue.Enqueue(e, e.Timestamp);
        }

        // Durchführung der Simulationsschleife
        public void Run()
        {
            // Chart-Daten initialisieren
            ChartTime.Add(Clock);
            ChartBusy.Add(State.Busy);
            ChartLength.Add(State.Queue.Count);

            // Solange rechnen, bis alle Ereignisse abgearbeitet sind
            while (EventQueue.Count > 0)
            {
                // Nächstes Ereignis aus der Warteschlange nehmen
                Event next = EventQueue.Dequeue();

                // Uhrzeit vorstellen auf den Zeitpunkt des Ereignisses
                Clock = next.Timestamp;

                // Chart-Daten aktualisieren
                ChartTime.Add(Clock);
                ChartBusy.Add(State.Busy);
                ChartLength.Add(State.Queue.Count);

                // Ankunftsereignisse erkennen und verarbeiten
                if (next is ArrivalEvent)
                {
                    if (State.Busy)
                    {
                        State.Queue.Enqueue(Clock);
                    }
                    else
                    {
                        State.Busy = true;

                        var waitTime = 0;

                        WaitTime.Add(waitTime);

                        var serviceTime = Random.NextDouble() * 5 * 60;

                        ServiceTime.Add(serviceTime);

                        Add(new DepartureEvent(Clock + serviceTime));
                    }
                }
                // Abfahrtsereignisse erkennen und verarbeiten
                else if (next is DepartureEvent)
                {
                    if (State.Queue.Count == 0)
                    {
                        State.Busy = false;
                    }
                    else
                    {
                        var arrivalTime = State.Queue.Dequeue();

                        var waitTime = Clock - arrivalTime;

                        WaitTime.Add(waitTime);

                        var serviceTime = Random.NextDouble() * 5 * 60;

                        ServiceTime.Add(serviceTime);

                        Add(new DepartureEvent(Clock + serviceTime));
                    }
                }
                // Andere Ereignistypen erkennen und verarbeiten
                else
                {
                    throw new Exception("Unsupported event type!");
                }

                // Chart-Daten aktualisieren
                ChartTime.Add(Clock);
                ChartBusy.Add(State.Busy);
                ChartLength.Add(State.Queue.Count);
            }
        }
    }
}
