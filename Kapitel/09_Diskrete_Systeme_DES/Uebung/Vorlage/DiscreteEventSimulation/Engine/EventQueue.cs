using System;
using System.Collections.Generic;

namespace DiscreteEventSimulation.Engine
{
    public enum SimEventType
    {
        Arrival,
        Departure,
        Custom
    }

    /// <summary>
    /// Repräsentiert ein diskretes Simulationsereignis mit Zeitstempel und Aktion.
    /// </summary>
    public record SimEvent(
        SimEventType Type, 
        double Time, 
        int EntityId = 0, 
        Action? Action = null, 
        string Description = "");

    /// <summary>
    /// Future Event List (FEL) basierend auf der min-orientierten .NET PriorityQueue.
    /// Garantiert O(log N) Einfüge- und Entnahmezeit.
    /// </summary>
    public class EventQueue
    {
        private readonly PriorityQueue<SimEvent, double> _queue = new();

        public int Count => _queue.Count;
        public bool IsEmpty => _queue.Count == 0;

        /// <summary>
        /// Fügt ein Ereignis in die Future Event List ein.
        /// Der Prioritätswert ist der Zeitstempel ev.Time.
        /// </summary>
        public void Enqueue(SimEvent ev)
        {
            _queue.Enqueue(ev, ev.Time);
        }

        /// <summary>
        /// Entnimmt das zeitlich nächste Ereignis (minimaler Zeitstempel).
        /// </summary>
        public SimEvent Dequeue()
        {
            return _queue.Dequeue();
        }

        /// <summary>
        /// Gibt das zeitlich nächste Ereignis ohne Entnahme zurück.
        /// </summary>
        public SimEvent Peek()
        {
            return _queue.Peek();
        }

        /// <summary>
        /// Leert die Event-Queue.
        /// </summary>
        public void Clear()
        {
            _queue.Clear();
        }
    }
}
