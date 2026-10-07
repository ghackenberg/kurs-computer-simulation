using System;

namespace SimulationMvvmPattern.Model
{
    /// <summary>
    /// Thread-sicherer Circular-Buffer mit vorallokierten Speicherfeldern für Zeit- und Messwert-Stream.
    /// Ermöglicht Zero-Allocation-Snapshots für 60-FPS Charting ohne GC-Druck.
    /// </summary>
    public class SimulationRingBuffer
    {
        private readonly double[] _times;
        private readonly double[] _values;
        private readonly object _lock = new();
        private int _head = 0;
        private int _count = 0;

        public int Capacity { get; }

        public int Count
        {
            get
            {
                lock (_lock)
                {
                    return _count;
                }
            }
        }

        public SimulationRingBuffer(int capacity)
        {
            Capacity = capacity > 0 ? capacity : throw new ArgumentException("Capacity muss positiv sein.", nameof(capacity));
            _times = new double[capacity];
            _values = new double[capacity];
        }

        /// <summary>
        /// Fügt einen neuen Messpunkt (Zeit, Signalwert) thread-sicher in den Ringpuffer ein.
        /// </summary>
        public void Enqueue(double time, double value)
        {
            lock (_lock)
            {
                _times[_head] = time;
                _values[_head] = value;
                _head = (_head + 1) % Capacity;
                if (_count < Capacity)
                {
                    _count++;
                }
            }
        }

        /// <summary>
        /// Kopiert atomar einen zeitlich chronologischen Snapshot in die übergebenen Ziel-Spans.
        /// </summary>
        /// <param name="targetTimes">Ziel-Array/Span für Zeitwerte.</param>
        /// <param name="targetValues">Ziel-Array/Span für Signalwerte.</param>
        /// <returns>Anzahl der tatsächlich kopierten Werte.</returns>
        public int CopySnapshot(Span<double> targetTimes, Span<double> targetValues)
        {
            lock (_lock)
            {
                if (_count == 0) return 0;

                int copyCount = Math.Min(_count, Math.Min(targetTimes.Length, targetValues.Length));
                int start = (_head - _count + Capacity) % Capacity;

                for (int i = 0; i < copyCount; i++)
                {
                    int idx = (start + i) % Capacity;
                    targetTimes[i] = _times[idx];
                    targetValues[i] = _values[idx];
                }

                return copyCount;
            }
        }

        /// <summary>
        /// Setzt den Ringpuffer thread-sicher zurück.
        /// </summary>
        public void Clear()
        {
            lock (_lock)
            {
                _head = 0;
                _count = 0;
            }
        }
    }
}
