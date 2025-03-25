using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 13)]
        public string CardNumber { get; set; } = string.Empty;

        [Required]
        public string CardHolder { get; set; } = string.Empty;

        [Required]
        public string ExpiryDate { get; set; } = string.Empty;

        [Required]
        [StringLength(3, MinimumLength = 3)]
        public string CVC { get; set; } = string.Empty;
    }
}
