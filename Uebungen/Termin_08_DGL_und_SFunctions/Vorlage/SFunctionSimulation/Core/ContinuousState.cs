using System;

namespace SFunctionSimulation.Core
{
    /// <summary>
    /// Kapselt den Zustandsvektor x eines kontinuierlichen dynamischen Systems.
    /// Bietet Hilfsmethoden für Vektoraddition und Skalarmultiplikation im Integrationsschritt.
    /// </summary>
    public class ContinuousState
    {
        public double[] Values { get; }
        public int Dimension => Values.Length;

        public ContinuousState(int dimension)
        {
            Values = new double[dimension];
        }

        public ContinuousState(double[] initialValues)
        {
            Values = (double[])initialValues.Clone();
        }

        public double this[int index]
        {
            get => Values[index];
            set => Values[index] = value;
        }

        public ContinuousState Clone()
        {
            return new ContinuousState(Values);
        }

        public void CopyFrom(double[] source)
        {
            if (source.Length != Values.Length)
                throw new ArgumentException("Dimensionsinkonsistenz beim Kopieren des Zustandsvektors!");
            Array.Copy(source, Values, Values.Length);
        }
    }
}
