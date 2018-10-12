/*$(document).ready(function () { 

$("#btnSubmit").click(function () {
            $.ajax({
                url: myUrl,
                data: { 'startDate': startDateId, 'endDate': endDateId },
                dataType: "json",
                type: "POST",
                cache: false,
                success: function (data) {
                    alert('yeah!');
                },
                error: function (request, status, error) {
                    LogError(request, startDate, error);
                    location.href = "error/error";
                }
            });
      }
}*/
test("verifies that calculator can add", function() {
    equal(calculate(1,1,"+"), 2);
});