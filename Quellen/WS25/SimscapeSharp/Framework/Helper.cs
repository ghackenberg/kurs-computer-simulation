using SimscapeSharp.Framework.Attributes;
using System.Reflection;

namespace SimscapeSharp.Framework
{
    internal static class Helper
    {
        public static List<T> GetProperties<T>(object parent)
        {
            List<T> result = new();

            foreach (var property in parent.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance))
            {
                if (typeof(T) == property.PropertyType || property.PropertyType.IsSubclassOf(typeof(T)))
                {
                    object? value = property.GetValue(parent);

                    if (value != null)
                    {
                        result.Add((T)value);
                    }
                }
            }

            return result;
        }
        public static List<T> GetProperties<T, S>(object parent) where S : Attribute
        {
            List<T> result = new();

            foreach (var property in parent.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance))
            {
                if (typeof(T) == property.PropertyType || property.PropertyType.IsSubclassOf(typeof(T)))
                {
                    if (property.GetCustomAttribute<S>() != null)
                    {
                        object? value = property.GetValue(parent);

                        if (value != null)
                        {
                            result.Add((T)value);
                        }
                    }
                }
            }

            return result;
        }
    }
}
