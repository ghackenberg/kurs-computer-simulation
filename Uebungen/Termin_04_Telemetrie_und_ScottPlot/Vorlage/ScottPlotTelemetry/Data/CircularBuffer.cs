using System.Collections;

namespace ScottPlotTelemetry.Data;

/// <summary>
/// Hochperformanter, allokationsfreier Ringpuffer mit fester Kapazität für kontinuierliche Zeitreihendaten.
/// Vermeidet Garbage-Collection-Overhead im hochfrequenten Streaming-Betrieb (0 Byte GC Allocations pro Add).
/// </summary>
/// <typeparam name="T">Datentyp der Messwerte (typisch double)</typeparam>
public class CircularBuffer<T> : IEnumerable<T>
{
    private readonly T[] _buffer;
    private int _start;
    private int _end;
    private int _count;

    public int Capacity => _buffer.Length;
    public int Count => _count;
    public bool IsFull => _count == _buffer.Length;

    public CircularBuffer(int capacity)
    {
        if (capacity <= 0)
            throw new ArgumentOutOfRangeException(nameof(capacity), "Kapazität muss positiv sein.");

        _buffer = new T[capacity];
        _start = 0;
        _end = 0;
        _count = 0;
    }

    /// <summary>
    /// Fügt ein neues Element hinzu. Wenn der Puffer voll ist, wird das älteste Element überschrieben.
    /// </summary>
    public void Add(T item)
    {
        _buffer[_end] = item;
        _end = (_end + 1) % _buffer.Length;

        if (_count < _buffer.Length)
        {
            _count++;
        }
        else
        {
            // Puffer ist voll: Startzeiger wandert mit
            _start = (_start + 1) % _buffer.Length;
        }
    }

    /// <summary>
    /// Indexer: 0 ist das älteste Element, (Count - 1) das neueste.
    /// </summary>
    public T this[int index]
    {
        get
        {
            if (index < 0 || index >= _count)
                throw new ArgumentOutOfRangeException(nameof(index));

            int actualIndex = (_start + index) % _buffer.Length;
            return _buffer[actualIndex];
        }
        set
        {
            if (index < 0 || index >= _count)
                throw new ArgumentOutOfRangeException(nameof(index));

            int actualIndex = (_start + index) % _buffer.Length;
            _buffer[actualIndex] = value;
        }
    }

    /// <summary>
    /// Kopiert die Elemente chronologisch in ein Ziel-Array, ohne neue Speicherzuweisungen zu erzeugen.
    /// </summary>
    public void CopyTo(T[] destination, int destinationIndex = 0)
    {
        ArgumentNullException.ThrowIfNull(destination);
        if (destination.Length - destinationIndex < _count)
            throw new ArgumentException("Ziel-Array ist zu klein.");

        for (int i = 0; i < _count; i++)
        {
            destination[destinationIndex + i] = this[i];
        }
    }

    /// <summary>
    /// Setzt den Puffer auf den Anfangszustand zurück.
    /// </summary>
    public void Clear()
    {
        _start = 0;
        _end = 0;
        _count = 0;
        Array.Clear(_buffer, 0, _buffer.Length);
    }

    public IEnumerator<T> GetEnumerator()
    {
        for (int i = 0; i < _count; i++)
        {
            yield return this[i];
        }
    }

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}
