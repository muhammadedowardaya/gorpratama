export default function GridLength(length) {
    if (length == 1) {
        return "md:grid-cols-1";
    } else if (length == 2) {
        return "md:grid-cols-2 sm:grid-cols-2";
    } else if (length == 3) {
        return "md:grid-cols-3 sm:grid-cols-2";
    } else if (length >= 4) {
        return "md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3";
    }
}
