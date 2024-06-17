
(* f迭代n次，初值x *)
Fixpoint iter{T:Set}(f:T->T)(n:nat)(x:T) :=
match n with
| O => x
| S n0 => f (iter f n0 x)
end.

(* 序数 *)
Inductive OnX {cf:nat->Set}:Set :=
| Zero
| Suc(x0:OnX)
| Limω(f: nat->OnX)
| LimN(n: nat)(f: cf n->OnX).

(* 序数加法 *)
Definition OnAdd{cf:nat->Set}(a b:@OnX cf): @OnX cf.
induction b.
- apply a.
- apply (Suc IHb).
- apply (Limω H).
- apply (LimN _ H).
Defined.

(* 序数乘自然数 *)
Definition OnMuln{cf:nat->Set}(a:@OnX cf)(b:nat): @OnX cf :=
iter (OnAdd a) b Zero.

Definition OnSuc(cf:nat->Set):nat->Set.
intro n.
destruct n as [|n].
- apply (@OnX cf).
- apply (cf n).
Defined.

Definition up(cf:nat->Set)(x:@OnX cf): @OnX (OnSuc cf).
induction x.
- apply Zero.
- apply (Suc IHx).
- apply (Limω H).
- apply (LimN (S n) H).
Defined.

Definition Ω(cf:nat->Set): @OnX (OnSuc cf) :=
  (LimN O (up cf)).

Definition ψ(cf:nat->Set)(x0: @OnX cf)(x: @OnX (OnSuc cf)): @OnX cf.
induction x.
- apply x0.
- apply (Limω (OnMuln IHx)).
- apply (Limω H).
- destruct n; cbn in H.
  + apply (Limω (fun n => iter H n Zero)).
  + apply (LimN n H).
Defined.

Inductive Empty : Set := .

Definition coden(n:nat): nat->Set.
induction n.
- apply (fun _=>Empty).
- apply (OnSuc IHn).
Defined.

Definition Ωn(n:nat): @OnX (coden n).
destruct n.
- apply (Suc Zero).
- apply (Ω (coden n)).
Defined.

Definition ψn(n:nat): @OnX (coden (S n)) -> @OnX (coden n) :=
ψ _ (Ωn n).

Definition ψ0ψn(n:nat): @OnX (coden (S n)) -> @OnX (coden O).
induction n.
- apply (ψn O).
- apply (fun z => IHn (ψn (S n) z)).
Defined.

Definition BOn(n:nat): @OnX (coden O) :=
 (ψ0ψn n (Ωn (S n))).


